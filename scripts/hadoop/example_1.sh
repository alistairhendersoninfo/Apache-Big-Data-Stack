# Install Java 8 or 11
sudo apt update
sudo apt install default-jdk ssh pdsh -y

# Verify Java installation
java -version

# Configure passwordless SSH (required for Hadoop)
ssh-keygen -t rsa -P '' -f ~/.ssh/id_rsa
cat ~/.ssh/id_rsa.pub >> ~/.ssh/authorized_keys
chmod 0600 ~/.ssh/authorized_keys

# Test SSH
ssh localhost
exit