# Create 'orders' topic with 3 partitions and RF=1 (single-node)
bin/kafka-topics.sh --create --topic orders \
  --bootstrap-server localhost:9092 \
  --partitions 3 \
  --replication-factor 1

# Create 'order-confirmations' topic
bin/kafka-topics.sh --create --topic order-confirmations \
  --bootstrap-server localhost:9092 \
  --partitions 3 \
  --replication-factor 1

# List all topics
bin/kafka-topics.sh --list --bootstrap-server localhost:9092

# Describe the 'orders' topic
bin/kafka-topics.sh --describe --topic orders \
  --bootstrap-server localhost:9092