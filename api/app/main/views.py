from main import app

from download.create import create_doc_api

from query.events_total import events_total_api
from query.activations import activations_api
from query.site_events import site_events_api
from query.email_events import email_events_api
from query.enrollments import enrollments_api
from query.marketplace_transactions import marketplace_transactions_api


# ----- ROUTES ----------------
app.register_blueprint(create_doc_api)

app.register_blueprint(events_total_api)
app.register_blueprint(activations_api)
app.register_blueprint(site_events_api)
app.register_blueprint(email_events_api)
app.register_blueprint(enrollments_api)
app.register_blueprint(marketplace_transactions_api)



# ------- Request Accessories --------

def add_crossdomain_headers(response):
    #import ipdb;ipdb.set_trace()
    if True: #'data' in request.path:
        response.headers.add('Access-Control-Allow-Origin', '*')
    return response


if app.debug:
    app.after_request(add_crossdomain_headers)

#if __name__ == '__main__':
#    app.run(debug=True, host='0.0.0.0')
