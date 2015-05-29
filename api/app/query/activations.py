from flask import Blueprint, request

from query.utils import get_csv_from_query

activations_api = Blueprint('activations_api', __name__, template_folder='templates')


@activations_api.route('/activations/<dc>', methods=['GET', 'OPTIONS'])
#@crossdomain(origin='*')
def handle_request(dc):

    query = """
    select 
        replace(full_date::date::varchar, '-','') AS date_id,
        event_type,
        event_count,
        sum(event_count) over (order by full_date) as cumulative_events,
        utility_id
    from mvw_event_summary_90_days
    group by event_type, event_count, utility_id, date_id, full_date
    order by utility_id, date_id; 

    """

    columns = ['date_id','event_type','event_count','cumulative_events','utility_id']

    response_text = get_csv_from_query(query=query, columns=columns)

    return response_text
