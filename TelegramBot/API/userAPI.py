import aiohttp
from API.urls import CHECKING_USER_URL, USER_REGISTRATION


async def checking_user(telegram_chart_id):
    async with aiohttp.ClientSession() as session:
        async with session.get(CHECKING_USER_URL, headers={"chartID": telegram_chart_id}) as response:
            return await response.json()


async def registration_user(name, email, password, telegram_chart_id):
    async with aiohttp.ClientSession() as session:
        data = {
            "name": name,
            "email": email,
            "password": password,
            "telegram_chat_id": telegram_chart_id
        }
        async with session.post(USER_REGISTRATION, data=data) as response:
            return await response.json()
