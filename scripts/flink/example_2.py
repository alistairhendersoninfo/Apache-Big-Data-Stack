from pyflink.datastream.window import TumblingEventTimeWindows, Time

# Tumbling window: non-overlapping, fixed size
stream.key_by(lambda x: x['customer_id']) \
      .window(TumblingEventTimeWindows.of(Time.minutes(5))) \
      .sum('amount')

# Sliding window: overlapping windows
from pyflink.datastream.window import SlidingEventTimeWindows
stream.key_by(lambda x: x['customer_id']) \
      .window(SlidingEventTimeWindows.of(Time.minutes(10), Time.minutes(5))) \
      .sum('amount')

# Session window: activity-based
from pyflink.datastream.window import EventTimeSessionWindows
stream.key_by(lambda x: x['customer_id']) \
      .window(EventTimeSessionWindows.with_gap(Time.minutes(30))) \
      .sum('amount')