# Create directories
mkdir -p /opt/hadoop/hdfs/namenode
mkdir -p /opt/hadoop/hdfs/datanode
mkdir -p /opt/hadoop/tmp

# Format namenode (only first time)
hdfs namenode -format

# Start HDFS
start-dfs.sh

# Start YARN
start-yarn.sh

# Verify processes are running
jps
# Should show: NameNode, DataNode, SecondaryNameNode, ResourceManager, NodeManager