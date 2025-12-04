# On each server, create myid file
# Server 1:
echo "1" > /opt/zookeeper/data/myid

# Server 2:
echo "2" > /opt/zookeeper/data/myid

# Server 3:
echo "3" > /opt/zookeeper/data/myid

# zoo.cfg on all servers:
server.1=zk1.example.com:2888:3888
server.2=zk2.example.com:2888:3888
server.3=zk3.example.com:2888:3888