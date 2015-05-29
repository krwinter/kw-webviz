select x.date_id, x.event_type, sum(x.event_count), x.utility_id from
    (select d.id as date_id, all_types.t as event_type, 0 as event_count, all_types.utility_id as utility_id
        from (
            select distinct(event_type) as t, uid.utility_id
            from fac_engagement_events
            cross join
            (select distinct(utility_id) from dim_users) as uid
        ) as all_types
        full outer join dim_dates as d on true
        where d.id between
            cast(to_char(cast('2014-12-01' as timestamp), 'YYYYMMDD') as int)
                    and
                cast(to_char(cast('2015-01-01' as timestamp), 'YYYYMMDD') as int)
    union
    select fue.date_id as e_date_id, fue.event_type as e_type, count( distinct u1.sid) as e_count, u1.utility_id as utility_id
        from fac_engagement_events as fue
        inner join dim_users as u1 on u1.id = fue.user_id
        -- WHERE fue.date_id between 2014-12-01 and $P{end_date}
        WHERE fue.date_id between
            cast(to_char(cast('2014-12-01' as timestamp), 'YYYYMMDD') as int)
                and
                cast(to_char(cast('2015-01-01' as timestamp), 'YYYYMMDD') as int)
        and fue.user_id != -1
        --and u1.utility_id = 1
        and u1.is_employee = 'N'
        and u1.user_type = 'User'
        group by u1.utility_id, e_date_id, fue.event_type
    ) as x
group by x.utility_id, event_type, date_id
order by x.utility_id, event_type, date_id
