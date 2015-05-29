select e_type, e_count, e_date_id  from (
select fue.event_type || '-all' as e_type, count( distinct fue.id) as e_count, d.id as e_date_id
from fac_engagement_events as fue
inner join dim_users as u1 on u1.id = fue.user_id
full outer join dim_dates d on d.id = fue.date_id
WHERE d.id between 20141023 and 20150123
and fue.user_id != -1
and u1.utility_id = 2
and u1.is_employee = 'N'
and u1.user_type = 'User'
group by fue.event_type, e_date_id

UNION

select fue.event_type || '-unique-total' as e_type, count( distinct u1.sid) as e_count, fue.date_id as e_date_id
from fac_engagement_events as fue
inner join dim_users as u1 on u1.id = fue.user_id
full outer join dim_dates d on d.id = fue.date_id
WHERE d.id between 20141023 and 20150123
and fue.user_id != -1
and u1.utility_id = 2
and u1.is_employee = 'N'
and u1.user_type = 'User'
group by fue.event_type, e_date_id

) as events
ORDER BY e_type, e_date_id