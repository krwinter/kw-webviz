SELECT
  REPLACE(full_date::date::varchar, '-','') AS dte_id,
  event_type AS even_type,                    
  event_count AS eventcount,
  utility_id AS utiity_id
FROM 
  mvw_event_summary_90_days
WHERE 
  event_type = 'Activated'
ORDER BY 
  utility_id, full_date, event_type
;