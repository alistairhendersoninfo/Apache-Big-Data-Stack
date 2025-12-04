from pyflink.datastream import StreamExecutionEnvironment
from pyflink.datastream.connectors.kafka import KafkaSource, KafkaSink
from pyflink.common.serialization import SimpleStringSchema
from pyflink.common import WatermarkStrategy
import json

def main():
    # Create execution environment
    env = StreamExecutionEnvironment.get_execution_environment()
    env.set_parallelism(2)

    # Enable checkpointing
    env.enable_checkpointing(10000)

    # Kafka source
    kafka_source = KafkaSource.builder() \
        .set_bootstrap_servers("localhost:9092") \
        .set_topics("transactions") \
        .set_group_id("fraud-detector") \
        .set_value_only_deserializer(SimpleStringSchema()) \
        .build()

    # Read from Kafka
    stream = env.from_source(
        kafka_source,
        WatermarkStrategy.no_watermarks(),
        "Kafka Source"
    )

    # Fraud detection logic
    def detect_fraud(transaction_json):
        tx = json.loads(transaction_json)
        if tx['amount'] > 5000 and tx['account_age'] < 30:
            return f"FRAUD: {tx['transaction_id']} - Amount: {tx['amount']}"
        return None

    # Process and filter
    alerts = stream.map(detect_fraud).filter(lambda x: x is not None)

    # Print alerts
    alerts.print()

    # Execute
    env.execute("Fraud Detection Job")

if __name__ == '__main__':
    main()