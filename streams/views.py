from django.shortcuts import render_to_response, get_object_or_404
from django.http import HttpResponseRedirect, HttpResponse
from django.core.urlresolvers import reverse
from django.template import RequestContext

from django.conf import settings
from stream.streams.models import Stream

def index(request):
	recentStreams = Stream.objects.all().order_by('-published')[:5]
	return render_to_response('home.dhtml', {'streams': recentStreams}, context_instance=RequestContext(request))
								
def post(request):
	try:
		text = request.POST['text']
	except (KeyError):
		return HttpResponse('{e=1}')
	else:
		stream = Stream(text=text);
		stream.updateTime().save();
		return HttpResponse('{e=0}')
