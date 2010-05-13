from django.db import models
import datetime

class Stream(models.Model):
	text = models.TextField(max_length=200)
	published = models.DateTimeField('date published')
	
	def updateTime(self):
		self.published = datetime.datetime.now()
		return self
	
	def __unicode__(self):
		return str(self.published) + ': ' + self.text[:10] + '...'

