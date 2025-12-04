-- Create index on event_type (use sparingly)
CREATE INDEX ON events (event_type);

-- Query using index
SELECT * FROM events
WHERE event_type = 'purchase'
ALLOW FILTERING;