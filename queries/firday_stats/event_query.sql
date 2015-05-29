-- with date_range as (select 20141023 as start_date, 20150123 as end_date)

select e_type, e_count from (
select fue.event_type || '-all' as e_type, count( distinct fue.id) as e_count
from fac_engagement_events as fue
inner join dim_users as u1 on u1.id = fue.user_id
WHERE fue.date_id between 20141023 and 20150123
and fue.user_id != -1
and u1.utility_id = 1
and u1.is_employee = 'N'
and u1.user_type = 'User'
group by fue.event_type

UNION

select fue.event_type || '-all-total' as e_type, count( distinct fue.id) as e_count
from fac_engagement_events as fue
inner join dim_users as u1 on u1.id = fue.user_id
WHERE fue.date_id between 20141023 and 20150123
and fue.user_id != -1
and u1.utility_id = 1
and u1.is_employee = 'N'
and u1.user_type = 'User'
group by fue.event_type

UNION

select fue.event_type || '-unique' as e_type, count( distinct u1.sid) as e_count
from fac_engagement_events as fue
inner join dim_users as u1 on u1.id = fue.user_id
WHERE fue.date_id between 20141023 and 20150123
and fue.user_id != -1
and u1.utility_id = 1
and u1.is_employee = 'N'
and u1.user_type = 'User'
group by fue.event_type

UNION

select fue.event_type || '-unique-total' as e_type, count( distinct u1.sid) as e_count
from fac_engagement_events as fue
inner join dim_users as u1 on u1.id = fue.user_id
WHERE fue.date_id between 20141023 and 20150123
and fue.user_id != -1
and u1.utility_id = 1
and u1.is_employee = 'N'
and u1.user_type = 'User'
group by fue.event_type
) as events
ORDER BY e_type