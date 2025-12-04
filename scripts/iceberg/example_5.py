# Show table history
history = spark.sql("SELECT * FROM local.sales_db.orders.history")
history.show(truncate=False)

# Get snapshot IDs
snapshots = spark.sql("SELECT * FROM local.sales_db.orders.snapshots")
snapshots.select("snapshot_id", "committed_at").show()

# Query specific snapshot (time travel)
snapshot_id = snapshots.first()['snapshot_id']

df_snapshot = spark.read \
    .option("snapshot-id", snapshot_id) \
    .table("local.sales_db.orders")

print(f"\nRecords in snapshot {snapshot_id}: {df_snapshot.count()}")

# Query as of timestamp
df_yesterday = spark.read \
    .option("as-of-timestamp", "2024-01-15 00:00:00") \
    .table("local.sales_db.orders")