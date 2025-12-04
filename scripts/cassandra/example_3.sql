-- Query by partition key (user_id)
SELECT * FROM events
WHERE user_id = <some-uuid>
LIMIT 10;

-- Query with time range (requires partition key)
SELECT * FROM events
WHERE user_id = <some-uuid>
  AND event_time > '2024-01-01'
  AND event_time < '2024-02-01';

-- Count events (avoid on large datasets)
SELECT COUNT(*) FROM events WHERE user_id = <some-uuid>;