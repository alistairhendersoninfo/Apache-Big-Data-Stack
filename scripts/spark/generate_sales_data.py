import pandas as pd
import numpy as np
from datetime import datetime, timedelta

# Generate 1 million sales records
np.random.seed(42)
num_records = 1000000

data = {
    'order_id': [f'ORD-{i:07d}' for i in range(num_records)],
    'customer_id': np.random.randint(1, 10000, num_records),
    'product_id': np.random.randint(1, 500, num_records),
    'category': np.random.choice(
        ['Electronics', 'Clothing', 'Books', 'Home', 'Sports'],
        num_records
    ),
    'amount': np.random.uniform(10, 2000, num_records).round(2),
    'quantity': np.random.randint(1, 10, num_records),
    'timestamp': [
        datetime.now() - timedelta(days=np.random.randint(0, 365))
        for _ in range(num_records)
    ],
    'country': np.random.choice(
        ['US', 'UK', 'DE', 'FR', 'CA', 'AU'],
        num_records
    )
}

df = pd.DataFrame(data)
df.to_parquet('sales_data.parquet', index=False)
print(f"Generated {num_records} records")
print(df.head())