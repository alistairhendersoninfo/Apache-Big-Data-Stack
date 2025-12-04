# Generate sample data
from datetime import date, timedelta
import random

orders_data = []
for i in range(1000):
    orders_data.append({
        'order_id': f'ORD-{i:05d}',
        'customer_id': random.randint(1, 100),
        'product': random.choice(['Laptop', 'Phone', 'Tablet', 'Monitor']),
        'amount': round(random.uniform(100, 2000), 2),
        'order_date': date.today() - timedelta(days=random.randint(0, 365)),
        'country': random.choice(['US', 'UK', 'DE', 'FR', 'CA'])
    })

df = spark.createDataFrame(orders_data)

# Insert into Iceberg table
df.writeTo("local.sales_db.orders").append()

print(f"Inserted {df.count()} orders")