SELECT
  REPLACE(full_date::date::varchar, '-','') AS dte_id,
  event_type AS even_type,                    
  event_count AS eventcount,
  utility_id AS utiity_id
FROM 
  mvw_event_summary_0_days
WHERE 
  event_type = 'LoggedIn'
ORDER BY 
  utility_id, full_date, event_type
;