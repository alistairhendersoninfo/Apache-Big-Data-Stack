# Create directory
mkdir -p ~/doris && cd ~/doris

# Download Doris 2.0 (FE + BE combined package)
wget https://downloads.apache.org/doris/2.0.4/apache-doris-2.0.4-bin-x86_64.tar.gz

# Extract
tar -xzf apache-doris-2.0.4-bin-x86_64.tar.gz

# Set environment
echo "export DORIS_HOME=~/doris/apache-doris-2.0.4-bin-x86_64" >> ~/.bashrc
source ~/.bashrc