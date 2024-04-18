from rest_framework.test import APITestCase
from rest_framework import status
from orders.models import Order, Position
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
        self.order = Order.objects.create(
            user=self.user,
        )
        self.position = Position.objects.create(
            order=self.order,
            item=self.item,
            quantity=1,
            price=1000,
        )


    def test_get_orders(self):
        self.client.force_authenticate(user=self.user)
        response = self.client.get(
            f'/orders/')
        self.assertEqual(
            response.status_code,
            status.HTTP_200_OK
        )

    def test_get_order(self):
        self.client.force_authenticate(user=self.user)
        response = self.client.get(
            f'/order/{self.order.pk}/')
        self.assertEqual(
            response.status_code,
            status.HTTP_200_OK
        )

    def test_update_order(self):
        self.client.force_authenticate(user=self.user)
        data = {
            "status": "R",
        }
        response = self.client.put(
            f'/order/{self.order.pk}/update/', data=data)
        self.assertEqual(
            response.status_code,
            status.HTTP_200_OK
        )

    def test_add_position(self):
        self.client.force_authenticate(user=self.user)
        data = {
            "order": self.order.id,
            "item": self.item.id,
            "quantity": 4,
            "price": 1000,
        }
        response = self.client.post(
            f'/position/create/', data=data)
        self.assertEqual(
            response.status_code,
            status.HTTP_200_OK
        )

    def test_delete_position(self):
        self.client.force_authenticate(user=self.user)
        response = self.client.delete(
            f'/position/{self.position.pk}/delete/')
        self.assertEqual(
            response.status_code,
            status.HTTP_204_NO_CONTENT
        )

    def test_get_last_order(self):
        self.client.force_authenticate(user=self.user)
        response = self.client.get(
            f'/lastorder/')
        self.assertEqual(
            response.status_code,
            status.HTTP_200_OK
        )
