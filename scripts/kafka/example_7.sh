# Simple consumer - reads from beginning
bin/kafka-console-consumer.sh --topic orders \
  --from-beginning \
  --bootstrap-server localhost:9092

# Consumer with consumer group (for parallel processing)
bin/kafka-console-consumer.sh --topic orders \
  --bootstrap-server localhost:9092 \
  --group order-processing-group \
  --from-beginning