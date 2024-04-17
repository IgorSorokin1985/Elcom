from django.core.management import BaseCommand
from items.models import Item, Category


test_categories = [
    {
        "name": "Motors"
    },
    {
        "name": "Pumps"
    },
    {
        "name": "Funs"
    },
    {
        "name": "Gears"
    },
]

test_motors = [
    {
        "name": "ESQ 100 LA2 B3",
        "category_id": 1,
        "power": 3,
        "speed": 3000,
        "im": 'B3',
        "weight": 15,
        "price": 30000,
        "stock": 156,
        "foto": 'motor.jpg'
    },
    {
        "name": "ESQ 132 S4 B3",
        "category_id": 1,
        "power": 5.5,
        "speed": 1500,
        "im": 'B3',
        "weight": 45,
        "price": 55000,
        "stock": 104,
        "foto": 'motor.jpg'
    },
    {
        "name": "ESQ 200 LA2 B3",
        "category_id": 1,
        "power": 30,
        "speed": 3000,
        "im": 'B35',
        "weight": 218,
        "price": 130000,
        "stock": 54,
        "foto": 'motor.jpg'
    },
    {
        "name": "ESQ 225 M4 B3",
        "category_id": 1,
        "power": 45,
        "speed": 3000,
        "im": 'B35',
        "weight": 290,
        "price": 142000,
        "stock": 42,
        "foto": 'motor.jpg'
    },
    {
        "name": "ESQ 315 LA2 B3",
        "category_id": 1,
        "power": 160,
        "speed": 3000,
        "im": 'B3',
        "weight": 1055,
        "price": 980000,
        "stock": 10,
        "foto": 'motor.jpg'
    },
    {
        "name": "ESQ 400 LB4 B3",
        "category_id": 1,
        "power": 560,
        "speed": 3000,
        "im": 'B3',
        "weight": 3600,
        "price": 1300000,
        "stock": 3,
        "foto": 'motor.jpg'
    },
    {
        "name": "ESQ 400 M4 B3",
        "category_id": 1,
        "power": 5,
        "speed": 3000,
        "im": 'B3',
        "weight": 20,
        "price": 1250000,
        "stock": 10,
        "foto": 'motor.jpg'
    },
]

test_pumps = [
    {
        "name": "K 100-80-160",
        "category_id": 2,
        "weight": 30,
        "price": 33000,
        "stock": 56,
        "foto": 'pump.jpg'
    },
    {
        "name": "K 65-50-160",
        "category_id": 2,
        "weight": 40,
        "price": 38000,
        "stock": 34,
        "foto": 'pump.jpg'
    },
    {
        "name": "K 150-125-250",
        "category_id": 2,
        "weight": 100,
        "price": 133000,
        "stock": 20,
        "foto": 'pump.jpg'
    },
    {
        "name": "K 50-32-125",
        "category_id": 2,
        "weight": 25,
        "price": 27000,
        "stock": 234,
        "foto": 'pump.jpg'
    },
    {
        "name": "1K 20-30",
        "category_id": 2,
        "weight": 15,
        "price": 15000,
        "stock": 145,
        "foto": 'pump.jpg'
    },
    {
        "name": "K 8-18",
        "category_id": 2,
        "weight": 22,
        "price": 27000,
        "stock": 134,
        "foto": 'pump.jpg'
    },
    {
        "name": "K 100-65-250",
        "category_id": 2,
        "weight": 80,
        "price": 102000,
        "stock": 45,
        "foto": 'pump.jpg'
    },
    {
        "name": "K 45-30",
        "category_id": 2,
        "weight": 45,
        "price": 45000,
        "stock": 67,
        "foto": 'pump.jpg'
    }
]

test_funs = [
    {
        "name": "BP 80-75 N2.5 0.12/1500",
        "category_id": 3,
        "weight": 15,
        "price": 27000,
        "stock": 47,
        "foto": 'fun.jpg'
    },
    {
        "name": "BP 80-75 N4 0.18/1000",
        "category_id": 3,
        "weight": 22,
        "price": 47000,
        "stock": 34,
        "foto": 'fun.jpg'
    },
    {
        "name": "BP 80-75 N5 0.55/1000",
        "category_id": 3,
        "weight": 33,
        "price": 67000,
        "stock": 23,
        "foto": 'fun.jpg'
    },
    {
        "name": "BP 80-75 N8 4/750",
        "category_id": 3,
        "weight": 44,
        "price": 87000,
        "stock": 12,
        "foto": 'fun.jpg'
    },
    {
        "name": "BP 80-75 N10 11/750",
        "category_id": 3,
        "weight": 55,
        "price": 127000,
        "stock": 7,
        "foto": 'fun.jpg'
    }
]

test_gears = [
    {
        "name": "NMRW 030/10",
        "category_id": 4,
        "weight": 15,
        "price": 27000,
        "stock": 124,
        "foto": 'gear.jpg'
    },
    {
        "name": "NMRW 040/10",
        "category_id": 4,
        "weight": 22,
        "price": 45000,
        "stock": 97,
        "foto": 'gear.jpg'
    },
    {
        "name": "NMRW 050/10",
        "category_id": 4,
        "weight": 45,
        "price": 55000,
        "stock": 67,
        "foto": 'gear.jpg'
    },
    {
        "name": "NMRW 063/10",
        "category_id": 4,
        "weight": 70,
        "price": 75000,
        "stock": 56,
        "foto": 'gear.jpg'
    },
    {
        "name": "NMRW 075/10",
        "category_id": 4,
        "weight": 88,
        "price": 98000,
        "stock": 34,
        "foto": 'gear.jpg'
    },
]


class Command(BaseCommand):
    def handle(self, *args, **options):
        #Item.objects.all().delete()
        #print('Items were deleted in database')
        for category in test_categories:
            new_category = Category.objects.create(**category)
            new_category.save()

        for test_motor in test_motors:
            motor = Item.objects.create(**test_motor)
            motor.save()
        print('Test items were added in database')
        for test_pump in test_pumps:
            pump = Item.objects.create(**test_pump)
            pump.save()
        print('Test pumps were added in database')
        for test_fun in test_funs:
            fun = Item.objects.create(**test_fun)
            fun.save()
        print('Test funs were added in database')
        for test_gear in test_gears:
            gear = Item.objects.create(**test_gear)
            gear.save()
        print('Test gears were added in database')
