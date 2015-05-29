SELECT b.utility_id,
--    b.schedule_time AS send_date,
   agg.date_id,
   sum(agg.count) AS sent,
   sum(agg.count) - sum(agg.soft_bounce) - sum(agg.hard_bounce) AS delivered,
   sum(agg.estimated_opens) AS opened,
   sum(agg.clicks) AS clicks,
   1.0 * sum(agg.estimated_opens)::numeric / (sum(agg.count) - sum(agg.soft_bounce) - sum(agg.hard_bounce))::numeric AS open_rate,
   1.0 * sum(agg.clicks)::numeric / (sum(agg.count) - sum(agg.soft_bounce) - sum(agg.hard_bounce))::numeric AS click_rate,
   1.0 * sum(agg.clicks)::numeric / sum(agg.estimated_opens)::numeric AS click_to_open
  FROM fac_email_aggregates agg
    JOIN dim_blasts b ON b.id = agg.blast_id
 WHERE b.id <> 2 -- AND b.schedule_time > (now() - '90 days'::interval)
 GROUP BY b.utility_id, agg.date_id
 ORDER BY b.utility_id, agg.date_id;

 -- OR

 SELECT b.utility_id,
   replace(b.schedule_time::date::varchar, '-','') AS date_id,
   sum(agg.count) AS sent,
   sum(agg.count) - sum(agg.soft_bounce) - sum(agg.hard_bounce) AS delivered,
   sum(agg.estimated_opens) AS opened,
   sum(agg.clicks) AS clicks,
   1.0 * sum(agg.estimated_opens)::numeric / (sum(agg.count) - sum(agg.soft_bounce) - sum(agg.hard_bounce))::numeric AS open_rate,
   1.0 * sum(agg.clicks)::numeric / (sum(agg.count) - sum(agg.soft_bounce) - sum(agg.hard_bounce))::numeric AS click_rate,
   1.0 * sum(agg.clicks)::numeric / sum(agg.estimated_opens)::numeric AS click_to_open
  FROM fac_email_aggregates agg
    JOIN dim_blasts b ON b.id = agg.blast_id
 WHERE b.id <> 2 AND b.schedule_time > (now() - '90 days'::interval)
 GROUP BY b.utility_id, b.schedule_time
 ORDER BY b.utility_id, b.schedule_time;
