# Create transactions topic
bin/kafka-topics.sh --create --topic transactions \
  --bootstrap-server localhost:9092 \
  --partitions 4 --replication-factor 1

# Create fraud-alerts topic
bin/kafka-topics.sh --create --topic fraud-alerts \
  --bootstrap-server localhost:9092 \
  --partitions 2 --replication-factor 1