// Using echarts-gl for millions of points
import 'echarts-gl';

const option = {
  grid3D: {},
  xAxis3D: { type: 'value' },
  yAxis3D: { type: 'value' },
  zAxis3D: { type: 'value' },
  series: [{
    type: 'scatter3D',
    data: massivePointCloud,  // Millions of [x, y, z] points
    symbolSize: 2,
    itemStyle: {
      opacity: 0.8
    }
  }]
};