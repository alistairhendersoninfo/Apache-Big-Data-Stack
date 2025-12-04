import pandas as pd
import pyarrow as pa
import pyarrow.parquet as pq

# Create sample data
df = pd.DataFrame({
    'id': range(1000000),
    'name': [f'user_{i}' for i in range(1000000)],
    'amount': [i * 1.5 for i in range(1000000)],
    'date': pd.date_range('2024-01-01', periods=1000000, freq='s')
})

# Write Parquet with compression
pq.write_table(
    pa.Table.from_pandas(df),
    'sales.parquet',
    compression='snappy'  # or 'gzip', 'lz4', 'zstd'
)

# Write partitioned dataset
df.to_parquet(
    'sales_partitioned/',
    partition_cols=['date'],
    engine='pyarrow'
)