# Start local cluster (1 JobManager + 1 TaskManager)
./bin/start-cluster.sh

# Verify cluster is running
jps

# Check Flink Web UI
# Open browser: http://localhost:8081

# View logs
tail -f log/flink-*-standalonesession-*.log