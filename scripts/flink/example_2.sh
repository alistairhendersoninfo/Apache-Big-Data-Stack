# Create directory
mkdir -p ~/flink && cd ~/flink

# Download Flink 1.19.0 (latest stable)
wget https://downloads.apache.org/flink/flink-1.19.0/flink-1.19.0-bin-scala_2.12.tgz

# Extract archive
tar -xzf flink-1.19.0-bin-scala_2.12.tgz
cd flink-1.19.0

# Set FLINK_HOME
echo "export FLINK_HOME=~/flink/flink-1.19.0" >> ~/.bashrc
echo "export PATH=\$PATH:\$FLINK_HOME/bin" >> ~/.bashrc
source ~/.bashrc