-- select x.date_id, the_count, avg(the_count) over (order by x.date_id rows between 13 preceding and current row) as the_avg
-- 
-- from (
-- 
--     select date_id,count(1) as the_count
-- 
--         from fac_engagement_events ee
-- 
--         where ee.date_id between 20140901 and 20141201
-- 
--         group by 1
-- 
-- ) as x
-- 
-- order by 1;


select y.date_id, y.event_type, y.utility_id, y.e_count,
    avg(y.e_count) over (partition by y.event_type, y.utility_id order by y.date_id rows between 13 preceding and current row) 
    from

(
select x.date_id, x.event_type, sum(x.event_count) as e_count, x.utility_id as utility_id from
	(select d.id as date_id, all_types.t as event_type, 0 as event_count, all_types.utility_id as utility_id
		from (
		    select distinct(event_type) as t, uid.utility_id 
		    from fac_engagement_events
		    cross join
		    (select distinct(utility_id) from dim_users) as uid 
		) as all_types
		full outer join dim_dates as d on true
		where d.id between 20141010 and 20150123
	union
	select fue.date_id as e_date_id, fue.event_type as e_type, count( distinct u1.sid) as e_count, u1.utility_id as utility_id
		from fac_engagement_events as fue
		inner join dim_users as u1 on u1.id = fue.user_id
		WHERE fue.date_id between 20141010 and 20150123
		and fue.user_id != -1
		--and u1.utility_id = 1
		and u1.is_employee = 'N'
		and u1.user_type = 'User'
		group by u1.utility_id, e_date_id, fue.event_type
	) as x
group by x.utility_id, event_type, date_id
--order by x.utility_id, event_type, date_id
) as y
--group by y.date_id, y.event_type, y.utility_id
order by y.utility_id, event_type, date_id
;
