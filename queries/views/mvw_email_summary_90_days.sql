-- Materialized View: mvw_email_summary_90_days

-- DROP MATERIALIZED VIEW mvw_email_summary_90_days;

CREATE MATERIALIZED VIEW mvw_email_summary_90_days AS
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
