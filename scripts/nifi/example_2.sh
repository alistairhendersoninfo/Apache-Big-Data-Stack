# Create directory
mkdir -p ~/nifi && cd ~/nifi

# Download NiFi 2.0
wget https://downloads.apache.org/nifi/2.0.0/nifi-2.0.0-bin.zip
unzip nifi-2.0.0-bin.zip
cd nifi-2.0.0

# Start NiFi
./bin/nifi.sh start

# Access Web UI (wait 1-2 minutes)
# https://localhost:8443/nifi

# Get auto-generated credentials
grep "Generated Username" logs/nifi-app.log