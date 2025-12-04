import * as Plot from '@observablehq/plot';
import { useRef, useEffect } from 'react';

function PlotChart({ data, options }) {
  const containerRef = useRef();

  useEffect(() => {
    const plot = Plot.plot({ ...options, marks: options.marks(data) });
    containerRef.current.replaceChildren(plot);
    return () => plot.remove();
  }, [data, options]);

  return <div ref={containerRef} />;
}

// Usage
<PlotChart
  data={salesData}
  options={{
    marks: (data) => [
      Plot.barY(data, Plot.groupX({ y: 'sum' }, { x: 'month', y: 'revenue' }))
    ]
  }}
/>