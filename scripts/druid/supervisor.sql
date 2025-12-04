-- Native Druid SQL
SELECT
  TIME_FLOOR(__time, 'PT1H') AS hour,
  country,
  COUNT(*) AS events,
  SUM(total_value) AS revenue
FROM events
WHERE __time >= CURRENT_TIMESTAMP - INTERVAL '24' HOUR
GROUP BY 1, 2
ORDER BY events DESC
LIMIT 100;

-- Approximate distinct count
SELECT
  APPROX_COUNT_DISTINCT(user_id) AS unique_users
FROM events
WHERE __time >= CURRENT_TIMESTAMP - INTERVAL '7' DAY;