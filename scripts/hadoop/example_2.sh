# Download Hadoop 3.4.0
cd /opt
sudo wget https://dlcdn.apache.org/hadoop/common/hadoop-3.4.0/hadoop-3.4.0.tar.gz
sudo tar -xzf hadoop-3.4.0.tar.gz
sudo mv hadoop-3.4.0 hadoop
sudo chown -R $USER:$USER /opt/hadoop

# Set environment variables
echo 'export HADOOP_HOME=/opt/hadoop' >> ~/.bashrc
echo 'export PATH=$PATH:$HADOOP_HOME/bin:$HADOOP_HOME/sbin' >> ~/.bashrc
echo 'export HADOOP_CONF_DIR=$HADOOP_HOME/etc/hadoop' >> ~/.bashrc
echo 'export JAVA_HOME=/usr/lib/jvm/default-java' >> ~/.bashrc
source ~/.bashrc

# Configure JAVA_HOME in Hadoop
echo "export JAVA_HOME=/usr/lib/jvm/default-java" >> $HADOOP_HOME/etc/hadoop/hadoop-env.sh