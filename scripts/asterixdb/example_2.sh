# Download AsterixDB
mkdir -p ~/asterixdb && cd ~/asterixdb
wget https://dlcdn.apache.org/asterixdb/asterixdb-server-0.9.10/asterixdb-server-0.9.10-binary-assembly.zip

# Extract
unzip asterixdb-server-0.9.10-binary-assembly.zip
cd asterixdb

# Start AsterixDB
./bin/asterixdb start

# Verify running
# Web UI: http://localhost:19001
# Query: http://localhost:19002