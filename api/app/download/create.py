import subprocess
from subprocess import call
from datetime import datetime

from StringIO import StringIO
from flask import Blueprint, request, make_response, send_from_directory, send_file
import tinys3

from main import app

create_doc_api = Blueprint('create_doc_api', __name__, template_folder='templates')

@create_doc_api.route('/download/<create_method>', methods=['GET', 'POST', 'OPTIONS'])
#@crossdomain(origin='*')
def create_doc(create_method):

    if create_method == 'pjs':
        return create_pjs_pdf()
    else:
        return create_wk_pdf()


def create_wk_pdf():
    
    if request.method == 'POST':
        page_name = request.form.get('pageName',None)
        start_date = request.form.get('startDate',None)
        end_date = request.form.get('endDate',None)

    #import ipdb;ipdb.set_trace()
    save_file_name = page_name + '_' + datetime.strftime(datetime.today(), "%Y%m%d-%H%M") + '.pdf'
    save_file_local_path = app.static_folder + '/reports/' + save_file_name
    save_file_remote_path = '/reports/' + save_file_name

    command = '/usr/local/bin/wkhtmltopdf --javascript-delay 7000' 
    command += ' --no-stop-slow-scripts -O Landscape --margin-top 5mm --margin-bottom 5mm '

    qs = '?pdfgen'

    if start_date and end_date:
        qs = qs + '&startDate=' + start_date + '&endDate=' + end_date

    url = app.config['WEBAPP_BASE_URL'] + '#' + page_name + qs

    command += '"' + url + '"'
    command += ' ' + save_file_local_path

    print '\n' + command + '\n'

    call(command, shell=True)

    uploaded_file_url = upload_to_s3(save_file_local_path, save_file_remote_path)

    return make_response(uploaded_file_url)




def upload_to_s3(local_file_path, save_file_name):
    # send to s3

    #import ipdb;ipdb.set_trace()
    conn = tinys3.Connection(
        app.config['AWS_ACCESS_KEY_ID'],
        app.config['AWS_SECRET_ACCESS_KEY'], 
        endpoint=app.config['AWS_ENDPOINT'],
        default_bucket=app.config['AWS_STORAGE_BUCKET_NAME']
    )

    f = open(local_file_path,'rb')
    aws_response = conn.upload(save_file_name,f)
    print aws_response

    # --- here's the url - TODO - something with it
    # in format of http://s3-us-west-1.amazonaws.com/se-dev/kw_mptrans.pdf
    file_url = aws_response.url
    return file_url


def create_pjs_pdf():
    #import ipdb;ipdb.set_trace()
    if request.method == 'POST':
        data = request.form['pdfData']
        #data = '<div>HEY!!!!</div>'
        #import ipdb;ipdb.set_trace()
    # we render with phantom js, and return
    subprocess.call(["/opt/phantomjs", app.config['BASE_DIR'] + "/download/rasterize.js", data, "/opt/google2.pdf"])

    return "Hi!"
