# Download Drill 1.21.1
cd /opt
sudo wget https://dlcdn.apache.org/drill/drill-1.21.1/apache-drill-1.21.1.tar.gz
sudo tar -xzf apache-drill-1.21.1.tar.gz
sudo mv apache-drill-1.21.1 drill
sudo chown -R $USER:$USER /opt/drill

# Set environment variables
echo 'export DRILL_HOME=/opt/drill' >> ~/.bashrc
echo 'export PATH=$PATH:$DRILL_HOME/bin' >> ~/.bashrc
source ~/.bashrc