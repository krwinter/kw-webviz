-- View: vw_email_summary_90_days

-- DROP VIEW vw_email_summary_90_days;

CREATE OR REPLACE VIEW vw_email_summary_90_days AS
 SELECT b.utility_id,
    to_char(b.schedule_time, 'YYYY-mm-dd'::text) AS send_date,
    sum(agg.count) AS sent,
    sum(agg.count) - sum(agg.soft_bounce) - sum(agg.hard_bounce) AS delivered,
    sum(agg.estimated_opens) AS opened,
    sum(agg.clicks) AS clicks,
    1.0 * sum(agg.estimated_opens)::numeric / (sum(agg.count) - sum(agg.soft_bounce) - sum(agg.hard_bounce))::numeric AS open_rate,
    1.0 * sum(agg.clicks)::numeric / (sum(agg.count) - sum(agg.soft_bounce) - sum(agg.hard_bounce))::numeric AS click_rate,
    1.0 * sum(agg.clicks)::numeric / sum(agg.estimated_opens)::numeric AS click_to_open
   FROM fac_email_aggregates agg
     JOIN dim_blasts b ON b.id = agg.blast_id
  WHERE b.id <> 2 AND b.schedule_time > ('now'::text::date - '90 days'::interval)
  GROUP BY b.utility_id, to_char(b.schedule_time, 'YYYY-mm-dd'::text)
  ORDER BY b.utility_id, to_char(b.schedule_time, 'YYYY-mm-dd'::text);

ALTER TABLE vw_email_summary_90_days
  OWNER TO datawarehouse;
GRANT ALL ON TABLE vw_email_summary_90_days TO datawarehouse;
GRANT SELECT ON TABLE vw_email_summary_90_days TO dw_ro;
GRANT SELECT, UPDATE, INSERT, DELETE ON TABLE vw_email_summary_90_days TO dw_rw;
