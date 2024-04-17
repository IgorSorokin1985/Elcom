from django.urls import path
from companies.views import CompanyListAPIView, CompanyUpdateAPIView, CompanyDestroyAPIView, CompanyRetrieveAPIView, CompanyCreateAPIView
from companies.apps import CompaniesConfig

app_name = CompaniesConfig.name

urlpatterns = [
    path('companies/', CompanyListAPIView.as_view(), name='companies_list'),
    path('company/<int:pk>/', CompanyRetrieveAPIView.as_view(), name='company_details'),
    path('company/create/', CompanyCreateAPIView.as_view(), name='company_details'),
    path('company/<int:pk>/delete/', CompanyDestroyAPIView.as_view(), name='company_delete'),
    path('company/<int:pk>/update/', CompanyUpdateAPIView.as_view(), name='company_dupdate'),
]
