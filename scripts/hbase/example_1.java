import org.apache.hadoop.conf.Configuration;
import org.apache.hadoop.hbase.*;
import org.apache.hadoop.hbase.client.*;
import org.apache.hadoop.hbase.util.Bytes;

public class HBaseExample {
    public static void main(String[] args) throws Exception {
        // Configuration
        Configuration config = HBaseConfiguration.create();
        config.set("hbase.zookeeper.quorum", "localhost");
        config.set("hbase.zookeeper.property.clientPort", "2181");

        // Connection
        try (Connection connection = ConnectionFactory.createConnection(config)) {

            // Get table
            Table table = connection.getTable(TableName.valueOf("user_activity"));

            // Put operation
            Put put = new Put(Bytes.toBytes("user003"));
            put.addColumn(
                Bytes.toBytes("profile"),
                Bytes.toBytes("name"),
                Bytes.toBytes("Charlie Brown")
            );
            table.put(put);

            // Get operation
            Get get = new Get(Bytes.toBytes("user003"));
            Result result = table.get(get);
            byte[] value = result.getValue(
                Bytes.toBytes("profile"),
                Bytes.toBytes("name")
            );
            System.out.println("Name: " + Bytes.toString(value));

            // Scan operation
            Scan scan = new Scan();
            scan.addFamily(Bytes.toBytes("profile"));
            ResultScanner scanner = table.getScanner(scan);

            for (Result res : scanner) {
                System.out.println("Row: " + Bytes.toString(res.getRow()));
            }
            scanner.close();
            table.close();
        }
    }
}