# Download Pinot 1.0.0
cd /opt
sudo wget https://dlcdn.apache.org/pinot/apache-pinot-1.0.0/apache-pinot-1.0.0-bin.tar.gz
sudo tar -xzf apache-pinot-1.0.0-bin.tar.gz
sudo mv apache-pinot-1.0.0-bin pinot
sudo chown -R $USER:$USER /opt/pinot

# Set environment
echo 'export PINOT_HOME=/opt/pinot' >> ~/.bashrc
echo 'export PATH=$PATH:$PINOT_HOME/bin' >> ~/.bashrc
source ~/.bashrc