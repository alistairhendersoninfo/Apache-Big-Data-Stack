cd $DORIS_HOME/fe

# Start FE
./bin/start_fe.sh --daemon

# Check logs
tail -f log/fe.log

# Verify FE is running (Web UI)
# http://localhost:8030