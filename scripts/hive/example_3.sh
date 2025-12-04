# Download Hive 4.0.0
cd /opt
sudo wget https://dlcdn.apache.org/hive/hive-4.0.0/apache-hive-4.0.0-bin.tar.gz
sudo tar -xzf apache-hive-4.0.0-bin.tar.gz
sudo mv apache-hive-4.0.0-bin hive
sudo chown -R $USER:$USER /opt/hive

# Set environment variables
echo 'export HIVE_HOME=/opt/hive' >> ~/.bashrc
echo 'export PATH=$PATH:$HIVE_HOME/bin' >> ~/.bashrc
source ~/.bashrc

# Download MySQL connector
cd $HIVE_HOME/lib
wget https://repo1.maven.org/maven2/mysql/mysql-connector-java/8.0.33/mysql-connector-java-8.0.33.jar