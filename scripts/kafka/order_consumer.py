from kafka import KafkaConsumer
import json

# Create consumer
consumer = KafkaConsumer(
    'orders',
    bootstrap_servers=['localhost:9092'],
    auto_offset_reset='earliest',
    enable_auto_commit=True,
    group_id='order-processor',
    value_deserializer=lambda x: json.loads(x.decode('utf-8'))
)

print("Waiting for orders...")

# Process messages
for message in consumer:
    order = message.value
    print(f"Processing Order: {order['order_id']}")
    print(f"  Customer: {order['customer_id']}")
    print(f"  Amount: ${order['amount']}")
    print(f"  Partition: {message.partition}, Offset: {message.offset}")
    print("-" * 50)