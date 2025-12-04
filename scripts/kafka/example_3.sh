# Generate a cluster UUID
KAFKA_CLUSTER_ID="$(bin/kafka-storage.sh random-uuid)"

# Format the storage directory
bin/kafka-storage.sh format -t $KAFKA_CLUSTER_ID \
  -c config/kraft/server.properties

# Start Kafka server in KRaft mode
bin/kafka-server-start.sh config/kraft/server.properties