# Update system
sudo apt update && sudo apt upgrade -y

# Install Java (Kafka requires Java 11+)
sudo apt install default-jdk -y

# Verify Java installation
java -version