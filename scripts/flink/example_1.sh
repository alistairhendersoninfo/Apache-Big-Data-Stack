# Update system
sudo apt update && sudo apt upgrade -y

# Install Java 11 (Flink requires Java 11 or 17)
sudo apt install openjdk-11-jdk -y

# Verify Java installation
java -version