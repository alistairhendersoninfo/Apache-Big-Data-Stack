from kafka import KafkaProducer
import json
import time
import random

# Create producer
producer = KafkaProducer(
    bootstrap_servers=['localhost:9092'],
    value_serializer=lambda v: json.dumps(v).encode('utf-8')
)

# Produce 20 orders
for i in range(20):
    order = {
        'order_id': f'ORD-{int(time.time())}-{i}',
        'customer_id': f'CUST-{random.randint(1, 100)}',
        'amount': random.randint(50, 1000),
        'product': random.choice(['Laptop', 'Phone', 'Tablet', 'Monitor']),
        'timestamp': time.strftime('%Y-%m-%d %H:%M:%S')
    }

    # Send to Kafka
    future = producer.send('orders', value=order)
    record_metadata = future.get(timeout=10)

    print(f"Sent order {order['order_id']} to partition {record_metadata.partition}")
    time.sleep(0.5)

producer.flush()
producer.close()