# Statement for enabling the development environment
DEBUG = 'True'

# Define the application directory
import os
BASE_DIR = os.path.abspath(os.path.dirname(__file__))

AWS_ACCESS_KEY_ID = '######'
AWS_SECRET_ACCESS_KEY = '#####'
AWS_STORAGE_BUCKET_NAME = 'mas-prod'
#AWS_ENDPOINT ='mas-prod.s3-us-west-2.amazonaws.com'   # this may change depending on where your bucket lives
AWS_ENDPOINT ='s3-us-west-2.amazonaws.com' 

# base url to hit to generate pdf
WEBAPP_BASE_URL = 'http://dummy.com/web/html/main.html'