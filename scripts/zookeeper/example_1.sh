# Download ZooKeeper 3.9.1
cd /opt
sudo wget https://dlcdn.apache.org/zookeeper/zookeeper-3.9.1/apache-zookeeper-3.9.1-bin.tar.gz
sudo tar -xzf apache-zookeeper-3.9.1-bin.tar.gz
sudo mv apache-zookeeper-3.9.1-bin zookeeper
sudo chown -R $USER:$USER /opt/zookeeper

# Set environment
echo 'export ZOOKEEPER_HOME=/opt/zookeeper' >> ~/.bashrc
echo 'export PATH=$PATH:$ZOOKEEPER_HOME/bin' >> ~/.bashrc
source ~/.bashrc

# Create data directory
mkdir -p /opt/zookeeper/data