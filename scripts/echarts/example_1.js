// Import only what you need for smaller bundles
import * as echarts from 'echarts/core';

// Import required components
import {
  TitleComponent,
  TooltipComponent,
  GridComponent,
  LegendComponent,
  DataZoomComponent
} from 'echarts/components';

// Import chart types
import {
  LineChart,
  BarChart,
  PieChart,
  ScatterChart
} from 'echarts/charts';

// Import renderer
import { CanvasRenderer } from 'echarts/renderers';
// Or for SVG: import { SVGRenderer } from 'echarts/renderers';

// Register components
echarts.use([
  TitleComponent,
  TooltipComponent,
  GridComponent,
  LegendComponent,
  DataZoomComponent,
  LineChart,
  BarChart,
  PieChart,
  ScatterChart,
  CanvasRenderer
]);