def create_cart_message(cart_info):
    sum = cart_info["summa"]
    result_message = f"""
Your CART!
Total - {sum} USD"""
    return result_message


def create_order_message(order_info):
    sum = order_info["summa"]
    result_message = f"""
Order {order_info["id"]} from {order_info["data"]}!
Total - {sum} USD
Status - {order_info["status"]}
Payment status - {order_info["payment_status"]}"""
    return result_message


def create_position_message(index, position):
    return f"""
{index + 1}) {position["item_name"]}
quantity - {position["quantity"]}
{position["availability_info"]}
Price - {position["price"]}
Position sum - {position["price"] * position["quantity"]}
"""
