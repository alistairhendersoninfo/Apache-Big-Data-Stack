# In zkCli.sh

# Create configuration znodes
create /config ""
create /config/database '{"host":"db.example.com","port":5432}'
create /config/cache '{"host":"redis.example.com","port":6379}'

# Read configuration
get /config/database

# Update configuration
set /config/database '{"host":"db2.example.com","port":5432}'

# List children
ls /config

# Watch for changes (one-time trigger)
get -w /config/database

# Delete
delete /config/cache