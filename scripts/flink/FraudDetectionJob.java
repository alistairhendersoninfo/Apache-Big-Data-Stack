import org.apache.flink.api.common.eventtime.WatermarkStrategy;
import org.apache.flink.api.common.functions.FilterFunction;
import org.apache.flink.connector.kafka.source.KafkaSource;
import org.apache.flink.connector.kafka.sink.KafkaSink;
import org.apache.flink.streaming.api.environment.StreamExecutionEnvironment;

public class FraudDetectionJob {
    public static void main(String[] args) throws Exception {
        // Set up execution environment
        StreamExecutionEnvironment env =
            StreamExecutionEnvironment.getExecutionEnvironment();

        // Enable checkpointing every 10 seconds
        env.enableCheckpointing(10000);

        // Kafka source
        KafkaSource<Transaction> source = KafkaSource
            .<Transaction>builder()
            .setBootstrapServers("localhost:9092")
            .setTopics("transactions")
            .setGroupId("fraud-detector")
            .setValueOnlyDeserializer(new TransactionDeserializer())
            .build();

        // Kafka sink for alerts
        KafkaSink<String> sink = KafkaSink.<String>builder()
            .setBootstrapServers("localhost:9092")
            .setRecordSerializer(...)
            .build();

        // Process stream
        env.fromSource(source, WatermarkStrategy.noWatermarks(), "Kafka")
           .filter(new FraudDetector())
           .map(tx -> "FRAUD ALERT: " + tx.toString())
           .sinkTo(sink);

        env.execute("Fraud Detection Job");
    }

    public static class FraudDetector implements FilterFunction<Transaction> {
        @Override
        public boolean filter(Transaction tx) {
            // Flag transactions > $5000 from new accounts
            return tx.amount > 5000 && tx.accountAge < 30;
        }
    }
}