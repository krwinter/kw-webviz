-- Materialized View: mvw_event_totals_7_days

-- DROP MATERIALIZED VIEW mvw_event_totals_7_days;

CREATE MATERIALIZED VIEW mvw_event_totals_7_days AS
SELECT t1.event_type,
   t1.event_count,
   t1.utility_id
  FROM dblink(
      'hostaddr=10.129.254.150 port=5432 dbname=datawarehouse user=datawarehouse password=S2mpleS2mple'::text,
      'select event_type,event_count,utility_id from vw_event_totals_7_days'::text
    )
    t1(
        event_type character varying(25), event_count numeric, utility_id smallint
    )
UNION ALL
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
