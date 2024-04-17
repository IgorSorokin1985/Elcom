from django.urls import path
from items.views import ItemsListAPIView, ItemsRetrieveAPIView, CategoriesListAPIView
from items.apps import ItemsConfig

app_name = ItemsConfig.name

urlpatterns = [
    path('items/', ItemsListAPIView.as_view(), name='items_list'),
    path('item/<int:pk>', ItemsRetrieveAPIView.as_view(), name='item_details'),
    path('categories/', CategoriesListAPIView.as_view(), name='categories_list')
]
