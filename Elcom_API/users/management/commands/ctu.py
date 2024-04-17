from django.core.management import BaseCommand
from users.models import User
from config.settings import TEST_USER_EMAIL, TEST_USER_PASSWORD, TEST_USER_TELEGRAM, TEST_USER_NAME


class Command(BaseCommand):
    """
    Create test user
    """

    def handle(self, *args, **options):
        user = User.objects.create(
            email=TEST_USER_EMAIL,
            name=TEST_USER_NAME,
            password=TEST_USER_PASSWORD,
            telegram_chat_id=TEST_USER_TELEGRAM,
            is_active=True,
        )

        user.set_password('admin')
        user.save()