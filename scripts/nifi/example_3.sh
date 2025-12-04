# Create input directory
mkdir -p /tmp/nifi-input

# Create sample CSV
cat > /tmp/nifi-input/sample.csv <<EOF
id,name,amount,timestamp
1,Product A,299.99,2024-01-15T10:00:00
2,Product B,149.50,2024-01-15T11:00:00
EOF