# Install PostgreSQL
sudo apt install postgresql postgresql-contrib -y
sudo systemctl start postgresql

# Create database and table
sudo -u postgres psql << EOF
CREATE DATABASE hopdb;
\c hopdb
CREATE TABLE sales_clean (
    sale_id INTEGER PRIMARY KEY,
    product_name VARCHAR(100),
    amount DECIMAL(10,2),
    sale_date DATE,
    region VARCHAR(50)
);
EOF