from cassandra.cluster import Cluster
from cassandra.query import SimpleStatement
import uuid
from datetime import datetime

# Connect to Cassandra
cluster = Cluster(['127.0.0.1'])
session = cluster.connect('user_activity')

# Insert data
user_id = uuid.uuid4()
session_id = uuid.uuid4()

insert_query = """
    INSERT INTO events (user_id, event_time, event_type, page_url, session_id, device_type)
    VALUES (%s, %s, %s, %s, %s, %s)
"""

session.execute(insert_query, (
    user_id,
    datetime.now(),
    'page_view',
    '/dashboard',
    session_id,
    'desktop'
))

# Query data
query = "SELECT * FROM events WHERE user_id = %s LIMIT 10"
rows = session.execute(query, (user_id,))

for row in rows:
    print(f"Event: {row.event_type} at {row.event_time} - {row.page_url}")

cluster.shutdown()