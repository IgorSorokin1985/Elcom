from companies.models import Company
from rest_framework import generics
from companies.serializer import CompanySerializer

# Create your views here.


class CompanyCreateAPIView(generics.CreateAPIView):
    """ APIView for creating Company """
    serializer_class = CompanySerializer

    def perform_create(self, serializer):
        new_company = serializer.save()
        user = self.request.user
        user.company = new_company
        user.save()
        new_company.save()


class CompanyListAPIView(generics.ListAPIView):
    """ APIView for send list of companies """
    serializer_class = CompanySerializer
    queryset = Company.objects.all()


class CompanyUpdateAPIView(generics.UpdateAPIView):
    """ APIView for updating company """
    serializer_class = CompanySerializer
    queryset = Company.objects.all()


class CompanyDestroyAPIView(generics.DestroyAPIView):
    """ APIView for deleting company """
    serializer_class = CompanySerializer
    queryset = Company.objects.all()


class CompanyRetrieveAPIView(generics.RetrieveAPIView):
    """ APIView for sending information about company """
    serializer_class = CompanySerializer
    queryset = Company.objects.all()
