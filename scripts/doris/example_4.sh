cd $DORIS_HOME/be

# Start BE
./bin/start_be.sh --daemon

# Check logs
tail -f log/be.log