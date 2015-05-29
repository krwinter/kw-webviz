activate_this = '/home/ken/venv/flask-api/bin/activate_this.py'
execfile(activate_this, dict(__file__=activate_this))

import sys
sys.path.insert(0, '/var/www/bi-webviz/api')
sys.path.insert(0, '/var/www/bi-webviz/api/app')

from main import app as application
