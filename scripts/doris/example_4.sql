-- Create routine load job to continuously ingest from Kafka
CREATE ROUTINE LOAD ecommerce.kafka_orders ON orders
COLUMNS(order_id, user_id, product_id, amount, order_date, country)
PROPERTIES (
    "desired_concurrent_number" = "3",
    "max_batch_interval" = "20",
    "max_batch_rows" = "300000",
    "max_batch_size" = "209715200",
    "strict_mode" = "false"
)
FROM KAFKA (
    "kafka_broker_list" = "localhost:9092",
    "kafka_topic" = "orders",
    "property.group.id" = "doris_orders",
    "property.kafka_default_offsets" = "OFFSET_BEGINNING"
);

-- Show routine load jobs
SHOW ROUTINE LOAD FOR ecommerce.kafka_orders\G

-- Pause load
PAUSE ROUTINE LOAD FOR ecommerce.kafka_orders;

-- Resume load
RESUME ROUTINE LOAD FOR ecommerce.kafka_orders;