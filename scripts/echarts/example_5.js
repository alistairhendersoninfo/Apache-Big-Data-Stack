// src/charts/gaugeCluster.ts
import * as echarts from 'echarts';
import type { EChartsOption, ECharts } from 'echarts';
import type { MetricGauge } from '../types/analytics';

export class GaugeCluster {
  private chart: ECharts;

  constructor(container: HTMLElement) {
    this.chart = echarts.init(container, 'dark');
    window.addEventListener('resize', () => this.chart.resize());
  }

  updateGauges(gauges: MetricGauge[]): void {
    const cols = Math.ceil(Math.sqrt(gauges.length));
    const rows = Math.ceil(gauges.length / cols);

    const series = gauges.map((gauge, index) => {
      const col = index % cols;
      const row = Math.floor(index / cols);

      const centerX = (col + 0.5) / cols * 100;
      const centerY = (row + 0.5) / rows * 100;

      return {
        type: 'gauge',
        center: [`${centerX}%`, `${centerY}%`],
        radius: `${Math.min(40 / cols, 40 / rows)}%`,
        startAngle: 200,
        endAngle: -20,
        min: gauge.min,
        max: gauge.max,
        splitNumber: 5,
        title: {
          offsetCenter: [0, '70%'],
          fontSize: 12,
          color: '#ccc'
        },
        detail: {
          fontSize: 20,
          offsetCenter: [0, '40%'],
          valueAnimation: true,
          formatter: (value: number) => value.toFixed(1),
          color: 'inherit'
        },
        axisLine: {
          lineStyle: {
            width: 10,
            color: gauge.thresholds.map((t, i, arr) => [
              (t.value - gauge.min) / (gauge.max - gauge.min),
              t.color
            ])
          }
        },
        axisTick: { show: false },
        splitLine: {
          length: 10,
          lineStyle: { color: '#444' }
        },
        axisLabel: {
          distance: 15,
          color: '#aaa',
          fontSize: 10
        },
        pointer: {
          width: 4,
          length: '60%',
          itemStyle: { color: 'auto' }
        },
        data: [{
          value: gauge.value,
          name: gauge.name
        }]
      };
    });

    this.chart.setOption({
      backgroundColor: 'transparent',
      series
    });
  }

  // Animate value change
  animateValue(gaugeName: string, newValue: number): void {
    const option = this.chart.getOption() as EChartsOption;
    const series = option.series as any[];

    const seriesIndex = series.findIndex(
      s => s.data && s.data[0]?.name === gaugeName
    );

    if (seriesIndex !== -1) {
      this.chart.setOption({
        series: [{
          data: [{ value: newValue, name: gaugeName }]
        }]
      }, { seriesIndex });
    }
  }

  dispose(): void {
    this.chart.dispose();
  }
}