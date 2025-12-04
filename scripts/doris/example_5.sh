# Connect to Doris using MySQL client
mysql -h 127.0.0.1 -P 9030 -u root

# Add BE node
ALTER SYSTEM ADD BACKEND "127.0.0.1:9050";

# Check backends
SHOW BACKENDS\G

# Exit
exit;