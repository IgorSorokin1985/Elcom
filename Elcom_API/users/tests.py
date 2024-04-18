from rest_framework.test import APITestCase
from rest_framework import status
from users.models import User, Log


class UserAPITest(APITestCase):

    def setUp(self):
        self.user = User.objects.create(
            name="testuser1",
            email="testuser1@test.com",
            telegram_chat_id="12345678",
            password='12345'
        )

    def test_get_user(self):
        self.client.force_authenticate(user=self.user)
        response = self.client.get(
            f'/user/{self.user.pk}/')
        self.assertEqual(
            response.status_code,
            status.HTTP_200_OK
        )

    def test_create_user(self):
        data = {
            "name": "testuser2",
            "email": "testuser2@test.com",
            "telegram_chat_id": "@testtelegram2",
            "password": "12345"
        }
        response = self.client.post(
            '/user/create/',
            data=data)
        self.assertEqual(
            response.status_code,
            status.HTTP_201_CREATED
        )

    def test_delete_user(self):
        self.client.force_authenticate(user=self.user)
        response = self.client.delete(
            f'/user/delete/{self.user.pk}/')
        self.assertEqual(
            response.status_code,
            status.HTTP_204_NO_CONTENT
        )


class LogAPITest(APITestCase):

    def setUp(self):
        self.user = User.objects.create(
            name="testuser1",
            email="testuser1@test.com",
            telegram_chat_id="12345678",
            password='12345'
        )
        self.log = Log.objects.create(
            user=self.user,
            action="test action"
        )

    def test_get_logs(self):
        self.client.force_authenticate(user=self.user)
        response = self.client.get(
            f'/logs/')
        self.assertEqual(
            response.status_code,
            status.HTTP_200_OK
        )

    def test_check_telegram_user(self):
        response = self.client.get(
            '/checkuserbytelegram/')
        self.assertEqual(
            response.status_code,
            status.HTTP_200_OK
        )
