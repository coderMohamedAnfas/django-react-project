# from django.urls import path
# from .views import home_view, seat_availability_view, college_view, branch_view,api_seat_availability,admin_view

# urlpatterns = [
#     path('', home_view, name='home'),
#     path('live/', seat_availability_view, name='seat_availability'),
#     path('college/<str:college_name>/', college_view, name='college_view'),
#     path('branch/<str:branch_name>/', branch_view, name='branch_view'),
#     path('api/seat-availability/', api_seat_availability, name='api_seat_availability'),
#     path('select-college/', admin_view, name='select_college'),
# ]

# from django.contrib import admin
from django.urls import path, re_path
from django.views.generic import TemplateView
from .views import home_view, college_view, branch_view, api_seat_availability, admin_view

urlpatterns = [
    # path('admin/', admin.site.urls),
      path('', home_view, name='home'),
      path('college/<str:college_name>/', college_view, name='college_view'),
    path('branch/<str:branch_name>/', branch_view, name='branch_view'),
    path('api/seat-availability/', api_seat_availability, name='api_seat_availability'),
    path('select-college/', admin_view, name='select_college'),
    re_path(r'^live/?$', TemplateView.as_view(template_name='index.html')),
]
