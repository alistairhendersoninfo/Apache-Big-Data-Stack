import pyarrow.parquet as pq

# Write Parquet file
pq.write_table(table, "sales_data.parquet", compression="snappy")

# Read Parquet file
table = pq.read_table("sales_data.parquet")

# Read specific columns only
table = pq.read_table("sales_data.parquet", columns=["name", "salary"])

# Read with filter (predicate pushdown)
table = pq.read_table(
    "sales_data.parquet",
    filters=[("age", ">", 30)]
)

# Read partitioned dataset
dataset = pq.ParquetDataset("data/year=2024/")
table = dataset.read()