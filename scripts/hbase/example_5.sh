# Snapshot for backup
hbase shell
snapshot 'user_activity', 'user_activity_backup_20240115'

# Export snapshot
hbase org.apache.hadoop.hbase.snapshot.ExportSnapshot \
  -snapshot user_activity_backup_20240115 \
  -copy-to hdfs://backup-cluster:9000/hbase