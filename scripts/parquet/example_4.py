# View schema
parquet_file = pq.ParquetFile('sales.parquet')
print(parquet_file.schema_arrow)

# View row group metadata
print(f"Num row groups: {parquet_file.metadata.num_row_groups}")
for i in range(parquet_file.metadata.num_row_groups):
    rg = parquet_file.metadata.row_group(i)
    print(f"Row group {i}: {rg.num_rows} rows")