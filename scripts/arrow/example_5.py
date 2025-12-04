import pyarrow.flight as flight

# Flight Server
class MyFlightServer(flight.FlightServerBase):
    def __init__(self, location):
        super().__init__(location)
        self.tables = {}

    def do_put(self, context, descriptor, reader, writer):
        key = descriptor.path[0].decode()
        self.tables[key] = reader.read_all()

    def do_get(self, context, ticket):
        key = ticket.ticket.decode()
        return flight.RecordBatchStream(self.tables[key])

# Start server
server = MyFlightServer("grpc://0.0.0.0:8815")
server.serve()

# Flight Client
client = flight.connect("grpc://localhost:8815")

# Upload data
upload_descriptor = flight.FlightDescriptor.for_path("my_table")
writer, _ = client.do_put(upload_descriptor, table.schema)
writer.write_table(table)
writer.close()

# Download data
ticket = flight.Ticket(b"my_table")
reader = client.do_get(ticket)
result = reader.read_all()