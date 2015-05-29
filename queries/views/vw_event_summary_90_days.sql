-- View: vw_event_summary_90_days

-- DROP VIEW vw_event_summary_90_days;

CREATE OR REPLACE VIEW vw_event_summary_90_days AS
 SELECT x.utility_id,
    x.full_date,
    x.event_type,
    sum(x.event_count) AS event_count
   FROM ( SELECT timezone('gmt'::text, d.full_date) AS full_date,
            all_types.t AS event_type,
            0 AS event_count,
            all_types.utility_id
           FROM ( SELECT DISTINCT fac_engagement_events.event_type AS t,
                    uid.utility_id
                   FROM fac_engagement_events
                     CROSS JOIN ( SELECT DISTINCT dim_users.utility_id
                           FROM dim_users) uid) all_types
             FULL JOIN dim_dates d ON true
          WHERE d.full_date >= (now() - '90 days'::interval) AND d.full_date <= now()
        UNION
         SELECT timezone('gmt'::text, d.full_date) AS e_date_id,
            fue.event_type AS e_type,
            count(DISTINCT u1.sid) AS e_count,
            u1.utility_id
           FROM fac_engagement_events fue
             JOIN dim_users u1 ON u1.id = fue.user_id
             JOIN dim_dates d ON d.id = fue.date_id
          WHERE d.full_date >= (now() - '90 days'::interval) AND d.full_date <= now() AND fue.user_id <> (-1) AND u1.is_employee::text = 'N'::text AND u1.user_type::text = 'User'::text
          GROUP BY u1.utility_id, timezone('gmt'::text, d.full_date), fue.event_type) x
  GROUP BY x.utility_id, x.event_type, x.full_date;

ALTER TABLE vw_event_summary_90_days
  OWNER TO datawarehouse;
GRANT ALL ON TABLE vw_event_summary_90_days TO datawarehouse;
GRANT SELECT ON TABLE vw_event_summary_90_days TO dw_ro;
GRANT SELECT, UPDATE, INSERT, DELETE ON TABLE vw_event_summary_90_days TO dw_rw;
