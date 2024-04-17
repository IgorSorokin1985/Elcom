from users.models import User


def get_user_by_telegram(request):
    """ Function for getting user by telegram chart ID """
    telegram_chart_id = request.headers["Chartid"]
    try:
        return User.objects.get(telegram_chat_id=telegram_chart_id)
    except Exception:
        print('ERROR')
