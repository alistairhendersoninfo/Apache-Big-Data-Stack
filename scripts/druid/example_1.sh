# Download Druid 28.0.0
cd /opt
sudo wget https://dlcdn.apache.org/druid/28.0.0/apache-druid-28.0.0-bin.tar.gz
sudo tar -xzf apache-druid-28.0.0-bin.tar.gz
sudo mv apache-druid-28.0.0 druid
sudo chown -R $USER:$USER /opt/druid

# Start single-server quickstart
cd /opt/druid
./bin/start-druid

# Access Druid Console: http://localhost:8888