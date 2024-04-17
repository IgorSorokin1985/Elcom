from orders.models import Position
from django.core.mail import send_mail
from config.settings import EMAIL_HOST_USER


def get_summa_order(order_id):
    """ Function for calculating Total for order """
    positions = Position.objects.all().filter(order=order_id)
    summa = 0
    for position in positions:
        summa += position.quantity * position.price
    return summa


def get_quantity_order(order_id):
    """ Function for calculating quantity items for order """
    positions = Position.objects.all().filter(order=order_id)
    result = 0
    for position in positions:
        result += position.quantity
    return result


def get_availability_position(position):
    """ Function for checking availability position """
    item = position.item
    if position.quantity <= item.stock:
        return "All is in stock"
    else:
        return f"{item.stock} is in stock"


def send_email(title, message, user):
    """ Function for sending email after completing order """
    try:
        send_mail(
            subject=title,
            message=message,
            from_email=EMAIL_HOST_USER,
            recipient_list=[user.email]
        )
    except Exception:
        print('Error')


def create_message_for_email(user, url, invoice_path):
    return f"""
Hello {user.name},

Your invoice you can load for this link - {invoice_path}.
You can pay for this link - {url}.

Best regards,
Elcom
"""
