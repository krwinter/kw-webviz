-- Materialized View: mvw_event_summary_90_days

-- DROP MATERIALIZED VIEW mvw_event_summary_90_days;

CREATE MATERIALIZED VIEW mvw_event_summary_90_days AS
 SELECT t1.utility_id,
    t1.full_date,
    t1.event_type,
    t1.event_count
   FROM dblink(
       'hostaddr=10.129.254.150 port=5432 dbname=datawarehouse user=datawarehouse password=S2mpleS2mple'::text,
       'select utility_id,full_date,event_type,event_count from vw_event_summary_90_days'::text
     )
     t1(
         utility_id smallint, full_date timestamp with time zone, event_type character varying(25), event_count numeric
     )
UNION ALL
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
