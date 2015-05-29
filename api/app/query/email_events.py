from datetime import date, timedelta
from flask import Blueprint, request

from query.utils import get_csv_from_query

email_events_api = Blueprint('email_events_api', __name__, template_folder='templates')

@email_events_api.route('/emailEvents/<dc>', methods=['GET', 'OPTIONS'])
# dc param is currently datacenter
def handle_request(dc):

    # TODO - fix view to return dateid in query so we can just use columns
    query="""
    select
        utility_id,
        replace(send_date::date::varchar, '-','') AS date_id,
        sent,
        delivered,
        opened,
        clicks,
        open_rate,
        click_rate,
        click_to_open
    from
        mvw_email_summary_90_days
    """

    columns = ['utility_id','date_id','sent','delivered','opened','clicks','open_rate','click_rate','click_to_open']

    response_text = get_csv_from_query(query=query, columns=columns)

    return response_text
