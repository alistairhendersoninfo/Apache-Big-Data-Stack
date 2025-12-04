-- Insert sample events
INSERT INTO events (user_id, event_time, event_type, page_url, session_id, device_type)
VALUES (uuid(), toTimestamp(now()), 'page_view', '/home', uuid(), 'mobile');

INSERT INTO events (user_id, event_time, event_type, page_url, session_id, device_type)
VALUES (uuid(), toTimestamp(now()), 'click', '/products/123', uuid(), 'desktop');

-- Insert with TTL (time-to-live)
INSERT INTO events (user_id, event_time, event_type, page_url, session_id, device_type)
VALUES (uuid(), toTimestamp(now()), 'purchase', '/checkout', uuid(), 'mobile')
USING TTL 86400;  -- Expire after 24 hours