#import psycopg2, StringIO
#from psycopg2 import extras
import StringIO

import csv
from csv import DictWriter

def get_csv_from_query(query, columns, dc='cornell'):

    # if (dc == 'dev'):
    #     conn = psycopg2.connect("host=dummy.com dbname=db_name_dev user=db_name password=dummy" )
    # else:
    #     conn = psycopg2.connect("host=dummy.com dbname=db_name user=db_name password=dummy" )

    # cur = conn.cursor()
    # cur.execute(query)

    dummy_file = StringIO.StringIO()
    #column_text = ','.join(columns) + '\n'

    csv_writer = csv.writer(dummy_file, columns)

    csv_writer.writerow(columns)
    # for row in cur:
    #     csv_writer.writerow(row)

    # cur.close()
    # conn.close()

    print dummy_file.getvalue()
    return dummy_file.getvalue()
