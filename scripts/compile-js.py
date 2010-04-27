# compiles js for dev and prod modes

import os
import re

path = os.path.dirname(__file__)

f = open(path+'/../media/js/stream.js', 'r')
fmin = open(path+'/../media/js/stream-min.js', 'w')

js = f.read()

for i in range(10):
	js = re.sub(r"'([^']*)\n([^']*)'",r"\1 ", js)

fmin.write(js)

fmin.close()
f.close()