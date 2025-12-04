#!/bin/bash

# Produce sample orders to Kafka
for i in {1..10}; do
  ORDER_ID="ORD-$(date +%s)-$i"
  CUSTOMER_ID="CUST-$((RANDOM % 100))"
  AMOUNT=$((RANDOM % 1000 + 50))

  echo "{\"order_id\":\"$ORDER_ID\",\"customer_id\":\"$CUSTOMER_ID\",\"amount\":$AMOUNT,\"timestamp\":\"$(date -Iseconds)\"}" | \
  bin/kafka-console-producer.sh --topic orders \
    --bootstrap-server localhost:9092

  echo "Produced order: $ORDER_ID"
  sleep 1
done