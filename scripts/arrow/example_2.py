import pandas as pd
import pyarrow as pa

# Pandas DataFrame to Arrow Table
df = pd.DataFrame({
    "id": range(1000000),
    "value": range(1000000)
})

# Convert to Arrow (zero-copy when possible)
table = pa.Table.from_pandas(df)

# Convert back to Pandas
df_back = table.to_pandas()

# Memory-mapped reading (very fast for large files)
table = pa.ipc.open_file("data.arrow").read_all()