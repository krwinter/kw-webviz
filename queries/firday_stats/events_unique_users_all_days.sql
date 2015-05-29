-- this gets all UNIQUE users
select x.date_id, x.event_type, sum(x.event_count) from
	(select d.id as date_id, all_types.t as event_type, 0 as event_count
		from ( select distinct(event_type) as t from fac_engagement_events ) as all_types
		full outer join dim_dates as d on true
		where d.id between 20141010 and 20150123
	union
	select fue.date_id as e_date_id, fue.event_type as e_type, count( distinct u1.sid) as e_count
		from fac_engagement_events as fue
		inner join dim_users as u1 on u1.id = fue.user_id
		WHERE fue.date_id between 20141010 and 20150123
		and fue.user_id != -1
		and u1.utility_id = 2
		and u1.is_employee = 'N'
		and u1.user_type = 'User'
		group by e_date_id, fue.event_type
	) as x
group by event_type, date_id
order by event_type, date_id
;
