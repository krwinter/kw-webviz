# Statement for enabling the development environment
DEBUG = 'True'

# Define the application directory
import os
BASE_DIR = os.path.abspath(os.path.dirname(__file__))

AWS_ACCESS_KEY_ID = '#####'  # krwinter
AWS_SECRET_ACCESS_KEY = '######'
AWS_STORAGE_BUCKET_NAME = 'se-dev' # krwinter
AWS_ENDPOINT ='s3-us-west-1.amazonaws.com'   # this may change depending on where your bucket lives

# base url to hit to generate pdf
WEBAPP_BASE_URL = 'http://localhost:8000/web/html/main.html'
