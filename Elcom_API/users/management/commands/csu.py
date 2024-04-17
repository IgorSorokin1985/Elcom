from django.core.management import BaseCommand

from users.models import User


class Command(BaseCommand):
    """
    Create SuperUser
    """

    def handle(self, *args, **options):
        user = User.objects.create(
            email='admin@sky.pro',
            name='admin',
            telegram_chat_id='12345',
            is_superuser=True,
            is_staff=True,
            is_active=True,
        )

        user.set_password('admin')
        user.save()
