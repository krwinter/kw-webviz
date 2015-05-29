from flask import Blueprint, request

from query.utils import get_csv_from_query

marketplace_transactions_api = Blueprint('marketplace_transactions_api', __name__, template_folder='templates')


@marketplace_transactions_api.route('/marketplaceTransactions/<dc>', methods=['GET', 'OPTIONS'])
# dc param is currently datacenter
def handle_request(dc):

    # TODO - misspelled commission
    columns = ['id','transaction_time','merchant_name','quantity','item_name','sku','sales_amount','commission_amount','commission_percentage','is_in_utility_treatment_group','date_id','alternate_id']

    query = 'select ' + ','.join(columns) + ' from fac_mp_referral_transactions'

    response_text = get_csv_from_query(dc='dev', query=query, columns=columns)

    return response_text
