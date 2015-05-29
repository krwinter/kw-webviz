from flask import Blueprint, request

from query.utils import get_csv_from_query

enrollments_api = Blueprint('enrollments_api', __name__, template_folder='templates')


@enrollments_api.route('/enrollments/<dc>', methods=['GET', 'OPTIONS'])
#@crossdomain(origin='*')
def handle_request(dc):

    query = """
        SELECT u.full_name as utility_name,
        d.calendar_year,
        d.month_name,
        min(d.id) as date_id,
        sum(
            CASE
                WHEN f.action::text = 'Enrollment'::text THEN 1
                ELSE 0
            END) AS enrollments,
        sum(
            CASE
                WHEN f.action::text = 'UnEnrollment'::text THEN 1
                ELSE 0
            END) AS unenrollments
       FROM fac_enrollments f
         JOIN dim_utilities u ON u.id = f.utility_id
         JOIN dim_dates d ON d.id = f.date_id
      GROUP BY u.full_name, d.calendar_year, d.month_name, d.month_of_year
      ORDER BY d.calendar_year, d.month_of_year;
    """

    columns = ['utility_name', 'calendar_year', 'month_name', 'date_id', 'enrollments', 'unenrollments']

    response_text = get_csv_from_query(query=query, columns=columns)

    return response_text
