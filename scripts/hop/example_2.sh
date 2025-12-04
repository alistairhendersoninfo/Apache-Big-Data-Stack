# Download Hop client (version 2.9.0)
cd /opt
sudo wget https://dlcdn.apache.org/hop/2.9.0/apache-hop-client-2.9.0.zip

# Extract
sudo unzip apache-hop-client-2.9.0.zip
sudo mv hop /opt/hop
sudo chown -R $USER:$USER /opt/hop

# Add to PATH
echo 'export HOP_HOME=/opt/hop' >> ~/.bashrc
echo 'export PATH=$PATH:$HOP_HOME' >> ~/.bashrc
source ~/.bashrc

# Make scripts executable
chmod +x /opt/hop/*.sh

# Launch Hop GUI
cd /opt/hop
./hop-gui.sh