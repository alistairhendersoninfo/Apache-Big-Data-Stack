-- Count events by type
SELECT event_type, COUNT(*) as cnt
FROM events
GROUP BY event_type
ORDER BY cnt DESC
LIMIT 10;

-- Time-series aggregation
SELECT
  DATETIMECONVERT(timestamp, '1:MILLISECONDS:EPOCH', '1:HOURS:EPOCH', '1:HOURS') as hour,
  COUNT(*) as events
FROM events
WHERE timestamp > ago('PT24H')
GROUP BY hour
ORDER BY hour;

-- Top countries by user count
SELECT country, DISTINCTCOUNT(user_id) as users
FROM events
GROUP BY country
ORDER BY users DESC;