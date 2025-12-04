// src/charts/distributionChart.ts
import * as echarts from 'echarts';
import type { EChartsOption, ECharts } from 'echarts';
import type { CategoryData } from '../types/analytics';

export class DistributionChart {
  private chart: ECharts;
  private chartType: 'pie' | 'sunburst' = 'pie';

  constructor(container: HTMLElement) {
    this.chart = echarts.init(container, 'dark');
    this.initChart();

    window.addEventListener('resize', () => this.chart.resize());
  }

  private initChart(): void {
    const option: EChartsOption = {
      backgroundColor: 'transparent',
      title: {
        text: 'Category Distribution',
        left: 'center',
        textStyle: { color: '#ccc' }
      },
      tooltip: {
        trigger: 'item',
        formatter: '{b}: {c} ({d}%)'
      },
      legend: {
        orient: 'vertical',
        left: 'left',
        top: 'middle',
        textStyle: { color: '#ccc' }
      },
      series: [{
        name: 'Distribution',
        type: 'pie',
        radius: ['40%', '70%'],  // Donut chart
        center: ['60%', '50%'],
        avoidLabelOverlap: true,
        itemStyle: {
          borderRadius: 10,
          borderColor: '#1a1a2e',
          borderWidth: 2
        },
        label: {
          show: true,
          formatter: '{b}\n{d}%',
          color: '#ccc'
        },
        emphasis: {
          label: {
            show: true,
            fontSize: 16,
            fontWeight: 'bold'
          },
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)'
          }
        },
        data: []
      }]
    };

    this.chart.setOption(option);
  }

  updateData(data: CategoryData[]): void {
    // Sort by value and take top 10
    const sortedData = [...data]
      .sort((a, b) => b.value - a.value)
      .slice(0, 10);

    // Color palette
    const colors = [
      '#5470c6', '#91cc75', '#fac858', '#ee6666', '#73c0de',
      '#3ba272', '#fc8452', '#9a60b4', '#ea7ccc', '#48b8d0'
    ];

    const chartData = sortedData.map((item, index) => ({
      name: item.name,
      value: item.value,
      itemStyle: { color: colors[index % colors.length] }
    }));

    this.chart.setOption({
      legend: { data: sortedData.map(d => d.name) },
      series: [{ data: chartData }]
    });
  }

  // Switch between pie and sunburst
  toggleChartType(): void {
    this.chartType = this.chartType === 'pie' ? 'sunburst' : 'pie';

    if (this.chartType === 'sunburst') {
      // Convert flat data to hierarchical for sunburst
      this.chart.setOption({
        series: [{
          type: 'sunburst',
          radius: ['15%', '80%'],
          label: { rotate: 'radial' }
        }]
      });
    } else {
      this.initChart();
    }
  }

  dispose(): void {
    this.chart.dispose();
  }
}