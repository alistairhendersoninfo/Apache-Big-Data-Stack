# Download HBase 2.5.8
cd /opt
sudo wget https://dlcdn.apache.org/hbase/2.5.8/hbase-2.5.8-bin.tar.gz
sudo tar -xzf hbase-2.5.8-bin.tar.gz
sudo mv hbase-2.5.8 hbase
sudo chown -R $USER:$USER /opt/hbase

# Set environment variables
echo 'export HBASE_HOME=/opt/hbase' >> ~/.bashrc
echo 'export PATH=$PATH:$HBASE_HOME/bin' >> ~/.bashrc
source ~/.bashrc