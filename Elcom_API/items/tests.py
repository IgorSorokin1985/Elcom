from rest_framework.test import APITestCase
from rest_framework import status
from items.models import Item, Category
from users.models import User


class ItemAPITest(APITestCase):

    def setUp(self):
        self.category = Category.objects.create(
            name="testcategory1"
        )
        self.user = User.objects.create(
            name="testuser1",
            email="testuser1@test.com",
            telegram_chat_id="12345678",
            password='12345'
        )
        self.item = Item.objects.create(
            name="testuser1",
            category=self.category,
            weight=20,
            price=1000,
            stock=100,
        )

    def test_get_items(self):
        self.client.force_authenticate(user=self.user)
        response = self.client.get(
            f'/items/')
        self.assertEqual(
            response.status_code,
            status.HTTP_200_OK
        )

    def test_get_item(self):
        self.client.force_authenticate(user=self.user)
        response = self.client.get(
            f'/item/{self.item.pk}')
        self.assertEqual(
            response.status_code,
            status.HTTP_200_OK
        )

    def test_get_categories(self):
        self.client.force_authenticate(user=self.user)
        response = self.client.get(
            f'/categories/')
        self.assertEqual(
            response.status_code,
            status.HTTP_200_OK
        )
