SELECT 
  u.full_name AS utility_name,
  d.calendar_year,
  d.month_name,
  MIN(d.id) AS date_id,
  SUM(
      CASE
          WHEN f.action::text = 'Enrollment'::text THEN 1
          ELSE 0
      END) AS enrollments,
  SUM(
      CASE
          WHEN f.action::text = 'UnEnrollment'::text THEN 1
          ELSE 0
      END) AS unenrollments
FROM fac_enrollments f
  JOIN dim_utilities u ON u.id = f.utility_id
  JOIN dim_dates d ON d.id = f.date_id
GROUP BY u.full_name, d.calendar_year, d.month_name, d.month_of_year
ORDER BY d.calendar_year, d.month_of_year
;