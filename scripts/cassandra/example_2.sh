# Add Cassandra repository
echo "deb https://debian.cassandra.apache.org 50x main" | \
  sudo tee /etc/apt/sources.list.d/cassandra.list

# Add repository keys
wget -q -O - https://www.apache.org/dist/cassandra/KEYS | sudo apt-key add -

# Install Cassandra
sudo apt update
sudo apt install cassandra -y

# Start Cassandra
sudo systemctl start cassandra
sudo systemctl enable cassandra

# Check status
sudo systemctl status cassandra
nodetool status