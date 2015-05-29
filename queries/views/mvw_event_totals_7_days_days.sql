-- Materialized View: mvw_event_totals_7_days

-- DROP MATERIALIZED VIEW mvw_event_totals_7_days;

CREATE MATERIALIZED VIEW mvw_event_totals_7_days AS
 SELECT vw_event_totals_7_days.event_type,
    vw_event_totals_7_days.event_count,
    vw_event_totals_7_days.utility_id
   FROM vw_event_totals_7_days
WITH DATA;

ALTER TABLE mvw_event_totals_7_days
  OWNER TO datawarehouse;
GRANT ALL ON TABLE mvw_event_totals_7_days TO datawarehouse;
GRANT SELECT ON TABLE mvw_event_totals_7_days TO dw_ro;
GRANT SELECT, UPDATE, INSERT, DELETE ON TABLE mvw_event_totals_7_days TO dw_rw;
