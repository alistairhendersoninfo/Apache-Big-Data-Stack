// src/charts/timeSeriesChart.ts
import * as echarts from 'echarts';
import type { EChartsOption, ECharts } from 'echarts';
import type { TimeSeriesPoint } from '../types/analytics';

export class TimeSeriesChart {
  private chart: ECharts;
  private data: Map<string, TimeSeriesPoint[]> = new Map();
  private maxPoints: number;

  constructor(container: HTMLElement, maxPoints = 100) {
    this.chart = echarts.init(container, 'dark');
    this.maxPoints = maxPoints;
    this.initChart();

    // Handle resize
    window.addEventListener('resize', () => this.chart.resize());
  }

  private initChart(): void {
    const option: EChartsOption = {
      backgroundColor: 'transparent',
      title: {
        text: 'Real-Time Metrics',
        left: 'center',
        textStyle: { color: '#ccc' }
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'cross',
          animation: false,
          label: { backgroundColor: '#505765' }
        }
      },
      legend: {
        data: [],
        bottom: 10,
        textStyle: { color: '#ccc' }
      },
      toolbox: {
        feature: {
          dataZoom: { yAxisIndex: 'none' },
          restore: {},
          saveAsImage: {}
        },
        right: 20
      },
      dataZoom: [
        {
          type: 'inside',
          start: 0,
          end: 100
        },
        {
          type: 'slider',
          start: 0,
          end: 100,
          height: 20,
          bottom: 40
        }
      ],
      grid: {
        left: '3%',
        right: '4%',
        bottom: '15%',
        containLabel: true
      },
      xAxis: {
        type: 'time',
        splitLine: { show: false },
        axisLine: { lineStyle: { color: '#444' } },
        axisLabel: { color: '#aaa' }
      },
      yAxis: {
        type: 'value',
        splitLine: { lineStyle: { color: '#333' } },
        axisLine: { lineStyle: { color: '#444' } },
        axisLabel: { color: '#aaa' }
      },
      series: []
    };

    this.chart.setOption(option);
  }

  addSeries(name: string, color: string): void {
    this.data.set(name, []);

    const series = {
      name,
      type: 'line',
      smooth: true,
      symbol: 'none',
      sampling: 'lttb',  // Largest-Triangle-Three-Buckets downsampling
      lineStyle: { width: 2, color },
      areaStyle: {
        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
          { offset: 0, color: color + '80' },
          { offset: 1, color: color + '10' }
        ])
      },
      data: []
    };

    this.chart.setOption({
      legend: { data: Array.from(this.data.keys()) },
      series: [series]
    }, { notMerge: false });
  }

  updateData(seriesName: string, point: TimeSeriesPoint): void {
    const seriesData = this.data.get(seriesName);
    if (!seriesData) return;

    seriesData.push(point);

    // Remove old points
    while (seriesData.length > this.maxPoints) {
      seriesData.shift();
    }

    // Find series index
    const option = this.chart.getOption() as EChartsOption;
    const series = option.series as any[];
    const seriesIndex = series.findIndex(s => s.name === seriesName);

    if (seriesIndex !== -1) {
      this.chart.setOption({
        series: [{
          data: seriesData.map(p => [p.timestamp.getTime(), p.value])
        }]
      }, {
        seriesIndex,
        notMerge: true,
        lazyUpdate: true
      });
    }
  }

  // Batch update for performance
  batchUpdate(updates: Map<string, TimeSeriesPoint[]>): void {
    const seriesUpdates: any[] = [];

    updates.forEach((points, seriesName) => {
      const seriesData = this.data.get(seriesName);
      if (!seriesData) return;

      seriesData.push(...points);
      while (seriesData.length > this.maxPoints) {
        seriesData.shift();
      }

      seriesUpdates.push({
        name: seriesName,
        data: seriesData.map(p => [p.timestamp.getTime(), p.value])
      });
    });

    this.chart.setOption({ series: seriesUpdates });
  }

  dispose(): void {
    this.chart.dispose();
  }
}