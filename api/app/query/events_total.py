from flask import Blueprint, request

from query.utils import get_csv_from_query

events_total_api = Blueprint('events_total_api', __name__, template_folder='templates')

@events_total_api.route('/eventsTotal/<dc>', methods=['GET', 'OPTIONS'])
#@crossdomain(origin='*')
def totalEvents(dc):

    columns = ['event_type','event_count','utility_id']

    query = 'select ' + ','.join(columns) + ' from mvw_event_totals_7_days'

    response_text = get_csv_from_query(query=query, columns=columns)

    return response_text
