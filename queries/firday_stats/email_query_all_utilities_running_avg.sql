﻿select x.utility_id, x.send_date, x.open_rate, x.click_rate,
avg(x.click_rate) over (partition by x.utility_id order by x.send_date)
-- make extra row for 'period' - doing date diff, and partition by that
from
(
select utility_id, to_char(schedule_time, 'YYYY-mm-dd') as send_date, sum(agg.count) as sent, sum(agg.count) - sum(soft_bounce) - sum(hard_bounce) as delivered,
sum(agg.estimated_opens) as opened, sum(clicks) as clicks,
1.0*sum(agg.estimated_opens) / (sum(agg.count) - sum(soft_bounce) - sum(hard_bounce)) as open_rate, 
1.0*sum(clicks) / (sum(agg.count) - sum(soft_bounce) - sum(hard_bounce)) as click_rate,
1.0*sum(clicks) / sum(agg.estimated_opens) as click_to_open  
from fac_email_aggregates as agg
inner join dim_blasts as b on b.id = agg.blast_id
-- where utility_id = 2
and b.id != 2
and schedule_time > '2014-10-23'
group by utility_id, send_date
) as x
order by utility_id,send_date asc
