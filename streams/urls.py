from django.conf.urls.defaults import *

urlpatterns = patterns('stream.streams.views',
	(r'^post$', 'post'),
)