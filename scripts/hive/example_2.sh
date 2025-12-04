# Create Hive metastore database
sudo mysql << EOF
CREATE DATABASE metastore;
CREATE USER 'hive'@'localhost' IDENTIFIED BY 'hivepassword';
GRANT ALL PRIVILEGES ON metastore.* TO 'hive'@'localhost';
FLUSH PRIVILEGES;
EOF