curl --location-trusted -u root: \
  -H "label:order_load_1" \
  -H "column_separator:," \
  -T orders.csv \
  http://127.0.0.1:8030/api/ecommerce/orders/_stream_load

# Check load status
mysql -h 127.0.0.1 -P 9030 -u root -e "SHOW LOAD FROM ecommerce;"