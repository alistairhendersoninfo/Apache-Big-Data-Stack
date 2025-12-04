# Create directory for Kafka
mkdir -p ~/kafka && cd ~/kafka

# Download Kafka 3.7.0 (latest stable)
wget https://downloads.apache.org/kafka/3.7.0/kafka_2.13-3.7.0.tgz

# Extract archive
tar -xzf kafka_2.13-3.7.0.tgz
cd kafka_2.13-3.7.0

# Set KAFKA_HOME environment variable
echo "export KAFKA_HOME=~/kafka/kafka_2.13-3.7.0" >> ~/.bashrc
echo "export PATH=\$PATH:\$KAFKA_HOME/bin" >> ~/.bashrc
source ~/.bashrc