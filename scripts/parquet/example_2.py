# Read entire file
df = pd.read_parquet('sales.parquet')

# Read specific columns only
df = pd.read_parquet('sales.parquet', columns=['id', 'amount'])

# Read with filter (predicate pushdown)
table = pq.read_table(
    'sales.parquet',
    filters=[('amount', '>', 1000)]
)

# Read partitioned dataset
df = pd.read_parquet('sales_partitioned/')

# Inspect metadata
parquet_file = pq.ParquetFile('sales.parquet')
print(parquet_file.schema)
print(parquet_file.metadata)