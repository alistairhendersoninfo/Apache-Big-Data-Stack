-- Create keyspace with replication
CREATE KEYSPACE user_activity
WITH replication = {
  'class': 'SimpleStrategy',
  'replication_factor': 3
};

USE user_activity;

-- Create table for user events
CREATE TABLE events (
    user_id UUID,
    event_time TIMESTAMP,
    event_type TEXT,
    page_url TEXT,
    session_id UUID,
    device_type TEXT,
    PRIMARY KEY ((user_id), event_time)
) WITH CLUSTERING ORDER BY (event_time DESC);

-- Describe table
DESCRIBE TABLE events;