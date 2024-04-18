from rest_framework.test import APITestCase
from rest_framework import status
from companies.models import Company
from users.models import User


class CompanyAPITest(APITestCase):

    def setUp(self):
        self.user = User.objects.create(
            name="testuser1",
            email="testuser1@test.com",
            telegram_chat_id="12345678",
            password='12345'
        )
        self.company = Company.objects.create(
            name="testcompany1",
            inn="12345678",
            kpp="12345678",
            address='testaddress',
            amount="12345678"
        )

    def test_get_companies(self):
        self.client.force_authenticate(user=self.user)
        response = self.client.get(
            f'/companies/')
        self.assertEqual(
            response.status_code,
            status.HTTP_200_OK
        )

    def test_create_company(self):
        self.client.force_authenticate(user=self.user)
        data = {
            "name": "testcompany2",
            "inn": "12345678",
            "kpp": "12345678",
            "address": "testaddress",
            "amount": "12345678"
        }
        response = self.client.post(
            '/company/create/',
            data=data)
        self.assertEqual(
            response.status_code,
            status.HTTP_201_CREATED
        )

    def test_delete_company(self):
        self.client.force_authenticate(user=self.user)
        response = self.client.delete(
            f'/company/{self.company.pk}/delete/')
        self.assertEqual(
            response.status_code,
            status.HTTP_204_NO_CONTENT
        )
