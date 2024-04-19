from aiogram import F, Router
from aiogram.types import Message
from aiogram.fsm.state import State, StatesGroup
from aiogram.fsm.context import FSMContext
from API.userAPI import registration_user
import keyboards.registration as kb


registration_route = Router()


class Registration(StatesGroup):
    name = State()
    email = State()
    password = State()


@registration_route.message(F.text == 'Registration')
async def registration(message: Message, state: FSMContext):
    await state.set_state(Registration.name)
    await message.answer('Write your name')


@registration_route.message(Registration.name)
async def registration_name(message: Message, state: FSMContext):
    await state.update_data(name=message.text)
    await state.set_state(Registration.email)
    await message.answer('Write your email')


@registration_route.message(Registration.email)
async def registration_email(message: Message, state: FSMContext):
    await state.update_data(email=message.text)
    await state.set_state(Registration.password)
    await message.answer('Write your password for account')


@registration_route.message(Registration.password)
async def registration_password(message: Message, state: FSMContext):
    await state.update_data(password=message.text)
    data = await state.get_data()
    await registration_user(data["name"], data["email"], data["password"], str(message.from_user.id))
    await message.answer('Registration is over. Press start again', reply_markup=kb.start)
    await state.clear()
