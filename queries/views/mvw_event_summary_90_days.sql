-- Materialized View: mvw_event_summary_90_days

-- DROP MATERIALIZED VIEW mvw_event_summary_90_days;

CREATE MATERIALIZED VIEW mvw_event_summary_90_days AS
 SELECT vw_event_summary_90_days.utility_id,
    vw_event_summary_90_days.full_date,
    vw_event_summary_90_days.event_type,
    vw_event_summary_90_days.event_count
   FROM vw_event_summary_90_days
WITH DATA;

ALTER TABLE mvw_event_summary_90_days
  OWNER TO datawarehouse;
GRANT ALL ON TABLE mvw_event_summary_90_days TO datawarehouse;
GRANT SELECT ON TABLE mvw_event_summary_90_days TO dw_ro;
GRANT SELECT, UPDATE, INSERT, DELETE ON TABLE mvw_event_summary_90_days TO dw_rw;
