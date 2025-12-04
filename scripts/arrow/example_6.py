expected_schema = pa.schema([
    ("id", pa.int64()),
    ("name", pa.string())
])
if table.schema != expected_schema:
    raise ValueError("Schema mismatch")