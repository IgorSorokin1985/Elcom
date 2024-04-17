import stripe
from config.settings import STRIPE_API_KEY
from orders.utils import get_summa_order, get_availability_position
from xhtml2pdf import pisa
from companies.models import Company
from orders.models import Position
from config.settings import URL

stripe.api_key = STRIPE_API_KEY


def get_url_for_payment(order):
    """ Function for generate url for payment """
    response_product = stripe.Product.create(name=f'Order {order.pk} from {order.data}')
    print(response_product)
    response_price = stripe.Price.create(
        currency="usd",
        unit_amount=get_summa_order(order)*100,
        product=response_product["id"],
    )
    print(response_price)
    response_url = stripe.checkout.Session.create(
        success_url="https://example.com/success",
        line_items=[{"price": response_price["id"], "quantity": 1}],
        mode="payment",
    )
    print(response_url)
    return response_url["url"]


def create_invoice_pdf(order):
    """ Function for creating invoice in PDF format for order """
    invoice_html = create_invoice_html(order)
    pisa.showLogging()
    output_filename = f"invoices/order_{order.id}_from_{order.data}.pdf"
    result_file = open('media/' + output_filename, "w+b")
    pisa.CreatePDF(
        invoice_html,
        dest=result_file)
    result_file.close()
    return URL + 'media/' + output_filename


def create_invoice_html(order):
    """ Function for creating html for invoice """
    user = order.user
    positions = Position.objects.all().filter(order=order)
    sum = get_summa_order(order.id)
    company = Company.objects.all().filter(user=user).last()
    head_and_styles_html = """
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Invoice</title>
    <style>
        body {
            font-family: Arial, sans-serif;
        }
        .invoice {
            width: 80%;
            margin: 0 auto;
            border: 1px solid #ccc;
            padding: 20px;
        }
        .invoice-header {
            text-align: center;
            margin-bottom: 20px;
        }
        .customer-info {
            margin-bottom: 20px;
        }
        .invoice-table {
            width: 100%;
            border-collapse: collapse;
            margin-bottom: 20px;
        }
        .invoice-table th, .invoice-table td {
            border: 1px solid #ccc;
            padding: 8px;
            text-align: left;
        }
        .total {
            text-align: right;
        }
    </style>
</head>"""
    body_user_info_html = f"""
    <body>
    <div class="invoice">
        <div class="invoice-header">
            <h1>Invoice {order.id}</h1>
            <p>Date: {order.data}</p>
        </div>
        <div class="customer-info">
            <h2>Customer Information</h2>
            <p>Name: {user.name}/p>
            <p>Email: {user.email}</p>
        </div>
"""
    body_company_info_html = ""
    if company:
        body_company_info_html = f"""
        <div class="customer-info">
            <h2>Company information</h2>
            <p>Company name: {company.name}/p>
            <p>INN: {company.inn}</p>
            <p>KPP: {company.kpp}</p>
            <p>Address: {company.address}</p>
            <p>Amount: {company.amount}</p>
        </div>
        """
    start_table = """
            <table class="invoice-table">
            <thead>
                <tr>
                    <th>Item</th>
                    <th>Quantity</th>
                    <th>Unit Price</th>
                    <th>Availability</th>
                    <th>Total</th>
                </tr>
            </thead>
            <tbody>
    """
    end_table = f"""
        </tbody>
        </table>
        <div class="total">
            <p>Total: USD {sum}</p>
        </div>
    </div>
</body>
</html>
"""
    positions_html = ""
    for position in positions:
        positions_html += f"""
                <tr>
                    <td>{position.item.name}</td>
                    <td>{position.quantity}</td>
                    <td>{position.price}</td>
                    <td>{get_availability_position(position)}</td>
                    <td>{position.quantity * position.price}</td>
                </tr>
"""
    result = (head_and_styles_html + body_user_info_html + body_company_info_html + start_table + positions_html
              + end_table)
    return result
