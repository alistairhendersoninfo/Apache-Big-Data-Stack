# Start ZooKeeper (in separate terminal or background)
bin/zookeeper-server-start.sh config/zookeeper.properties &

# Wait 5 seconds for ZooKeeper to start
sleep 5

# Start Kafka broker
bin/kafka-server-start.sh config/server.properties &