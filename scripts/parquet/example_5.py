# Parquet encryption (requires encryption keys)
encryption_config = pq.EncryptionConfiguration(
    footer_key="footer_key",
    column_keys={"amount": "column_key"}
)