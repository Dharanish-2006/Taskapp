from rest_framework import routers
from .views import taskviews 
router =routers.SimpleRouter()
router.register('task',taskviews,basename='task')