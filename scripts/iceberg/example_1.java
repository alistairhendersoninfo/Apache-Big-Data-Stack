import org.apache.flink.streaming.api.environment.StreamExecutionEnvironment;
import org.apache.flink.table.api.bridge.java.StreamTableEnvironment;

StreamExecutionEnvironment env = StreamExecutionEnvironment.getExecutionEnvironment();
StreamTableEnvironment tEnv = StreamTableEnvironment.create(env);

// Create Iceberg catalog
tEnv.executeSql("CREATE CATALOG iceberg_catalog WITH (" +
    "'type'='iceberg'," +
    "'catalog-type'='hadoop'," +
    "'warehouse'='file:///tmp/iceberg-warehouse'" +
    ")");

// Use catalog
tEnv.executeSql("USE CATALOG iceberg_catalog");

// Stream writes to Iceberg
tEnv.executeSql("INSERT INTO sales_db.orders " +
    "SELECT order_id, customer_id, amount FROM kafka_orders");