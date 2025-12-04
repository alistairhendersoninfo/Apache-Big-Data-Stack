# Verify Hadoop is running
jps | grep -E "NameNode|DataNode"

# Install MySQL for metastore (recommended over Derby)
sudo apt install mysql-server -y
sudo systemctl start mysql