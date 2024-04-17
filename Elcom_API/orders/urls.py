from django.urls import path
from orders.views import (OrderListAPIView, OrderRetrieveAPIView, PositionDestroyAPIView, PositionUpdateAPIView,
                          OrderUpdateAPIView, PositionAddAPIView, GetLastOrderByUser)
from orders.apps import OrdersConfig

app_name = OrdersConfig.name

urlpatterns = [
    path('orders/', OrderListAPIView.as_view(), name='orders_list'),
    path('order/<int:pk>/', OrderRetrieveAPIView.as_view(), name='order_details'),
    path('order/<int:pk>/update/', OrderUpdateAPIView.as_view(), name='order_update'),
    path('position/create/', PositionAddAPIView.as_view(), name='position_create'),
    path('position/<int:pk>/delete/', PositionDestroyAPIView.as_view(), name='position_delete'),
    path('position/<int:pk>/update/', PositionUpdateAPIView.as_view(), name='position_update'),
    path('lastorder/', GetLastOrderByUser.as_view(), name='last_order'),
]
