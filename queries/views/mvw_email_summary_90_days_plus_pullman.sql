-- Materialized View: mvw_email_summary_90_days

-- DROP MATERIALIZED VIEW mvw_email_summary_90_days;

CREATE MATERIALIZED VIEW mvw_email_summary_90_days AS
SELECT t1.utility_id,
   t1.send_date,
   t1.sent,
   t1.delivered,
   t1.opened,
   t1.clicks,
   t1.open_rate,
   t1.click_rate,
   t1.click_to_open
  FROM dblink(
        'hostaddr=10.129.254.150 port=5432 dbname=datawarehouse user=datawarehouse password=S2mpleS2mple'::text,
        'select utility_id,send_date,sent,delivered,opened,clicks,open_rate,click_rate,click_to_open from vw_email_summary_90_days'::text
      )
      t1(
         utility_id smallint, send_date timestamp text, sent bigint, delivered bigint, opened bigint, clicks bigint, open_rate numeric, click_rate numeric, click_to_open numeric
      )
UNION ALL
 SELECT vw_email_summary_90_days.utility_id,
    vw_email_summary_90_days.send_date,
    vw_email_summary_90_days.sent,
    vw_email_summary_90_days.delivered,
    vw_email_summary_90_days.opened,
    vw_email_summary_90_days.clicks,
    vw_email_summary_90_days.open_rate,
    vw_email_summary_90_days.click_rate,
    vw_email_summary_90_days.click_to_open
   FROM vw_email_summary_90_days
WITH DATA;

ALTER TABLE mvw_email_summary_90_days
  OWNER TO datawarehouse;
GRANT ALL ON TABLE mvw_email_summary_90_days TO datawarehouse;
GRANT SELECT ON TABLE mvw_email_summary_90_days TO dw_ro;
GRANT SELECT, UPDATE, INSERT, DELETE ON TABLE mvw_email_summary_90_days TO dw_rw;
