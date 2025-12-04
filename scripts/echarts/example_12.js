// Batch updates for better performance
chart.setOption(newOption, {
  notMerge: false,        // Merge with existing option
  lazyUpdate: true,       // Delay rendering
  silent: true            // Don't trigger events
});

// Use appendData for streaming scenarios
chart.appendData({
  seriesIndex: 0,
  data: newPoints
});

// Throttle rapid updates
import { throttle } from 'lodash';

const throttledUpdate = throttle((data) => {
  chart.setOption({ series: [{ data }] });
}, 100);