from pyflink.datastream import StreamExecutionEnvironment
from pyflink.datastream.functions import KeyedProcessFunction, RuntimeContext
from pyflink.datastream.state import ValueStateDescriptor

class SpendingTracker(KeyedProcessFunction):
    def __init__(self):
        self.total_spending_state = None

    def open(self, runtime_context: RuntimeContext):
        descriptor = ValueStateDescriptor("total-spending", float)
        self.total_spending_state = runtime_context.get_state(descriptor)

    def process_element(self, value, ctx):
        # Get current total
        current_total = self.total_spending_state.value()
        if current_total is None:
            current_total = 0.0

        # Update total
        new_total = current_total + value['amount']
        self.total_spending_state.update(new_total)

        # Alert if spending > $10,000
        if new_total > 10000:
            yield f"High spending alert: Customer {value['customer_id']} " \
                  f"has spent ${new_total}"

# Use in stream
env = StreamExecutionEnvironment.get_execution_environment()
stream.key_by(lambda tx: tx['customer_id']) \
      .process(SpendingTracker()) \
      .print()