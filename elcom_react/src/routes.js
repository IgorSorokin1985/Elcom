import { MODERATOR_ROUTE, BASKET_ROUTE, ITEM_ROUTE, LOGIN_ROUTE, REGISTRATION_ROUTE, SHOP_ROUTE } from "./utils/consts"
import Moderator from "./pages/Moderator"
import Shop from  "./pages/Shop"
import Auth from "./pages/Auth"
import Basket from "./pages/Basket"
import ItemDeteils from "./pages/ItemDetails"

export const authRoutes = [
    {
        path: MODERATOR_ROUTE,
        Component: Moderator
    },
    {
        path: BASKET_ROUTE,
        Component: Basket
    },
]

export const publicRoutes = [
    {
        path: SHOP_ROUTE,
        Component: Shop
    },
    {
        path: LOGIN_ROUTE,
        Component: Auth
    },
    {
        path: REGISTRATION_ROUTE,
        Component: Auth
    },
    {
        path: ITEM_ROUTE + '/:id',
        Component: ItemDeteils
    },
]