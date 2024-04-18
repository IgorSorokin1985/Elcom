from aiogram import Router
from aiogram.filters import CommandStart
from aiogram.types import Message
import keyboards.common as kb
from API.userAPI import checking_user


common_router = Router()


@common_router.message(CommandStart())
async def cmd_start(message: Message):
    answer = await checking_user(str(message.from_user.id))
    print(answer)
    print("USER!!!!")
    if answer["answer"]:
        await message.answer('Hello, Can I help you?', reply_markup=kb.main)
    else:
        await message.answer('You need to register?', reply_markup=kb.new_user)
