from flask import Blueprint, request

from query.utils import get_csv_from_query

site_events_api = Blueprint('site_events_api', __name__, template_folder='templates')


@site_events_api.route('/siteEvents/<dc>', methods=['GET', 'OPTIONS'])
#@crossdomain(origin='*')
def handle_request(dc):

    query = """
    select
        replace(full_date::date::varchar, '-','') AS date_id,
        event_type as event_type,
        event_count as event_count,
        utility_id as utility_id
    from mvw_event_summary_90_days
    order by utility_id, full_date, event_type;

    """

    columns = ['date_id','event_type','event_count','utility_id']

    response_text = get_csv_from_query(query=query, columns=columns)

    return response_text
