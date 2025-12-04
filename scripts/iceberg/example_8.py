# Expire old snapshots (cleanup metadata)
spark.sql("""
    CALL local.system.expire_snapshots(
        table => 'sales_db.orders',
        older_than => TIMESTAMP '2024-01-01 00:00:00',
        retain_last => 10
    )
""")

# Remove orphan files
spark.sql("""
    CALL local.system.remove_orphan_files(
        table => 'sales_db.orders'
    )
""")

# Compact data files
spark.sql("""
    CALL local.system.rewrite_data_files(
        table => 'sales_db.orders',
        options => map('target-file-size-bytes', '134217728')
    )
""")

# Rewrite manifests
spark.sql("""
    CALL local.system.rewrite_manifests('sales_db.orders')
""")