-- Batch insert (use for same partition key only)
BEGIN BATCH
    INSERT INTO events (user_id, event_time, event_type, page_url, session_id, device_type)
    VALUES (uuid(), toTimestamp(now()), 'login', '/login', uuid(), 'mobile');

    INSERT INTO events (user_id, event_time, event_type, page_url, session_id, device_type)
    VALUES (uuid(), toTimestamp(now()), 'view', '/profile', uuid(), 'mobile');
APPLY BATCH;