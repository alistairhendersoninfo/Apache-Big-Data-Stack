// Proper cleanup to prevent memory leaks
class ChartManager {
  private charts: Map<string, ECharts> = new Map();

  create(id: string, container: HTMLElement): ECharts {
    // Dispose existing chart if any
    this.dispose(id);

    const chart = echarts.init(container);
    this.charts.set(id, chart);
    return chart;
  }

  dispose(id: string): void {
    const chart = this.charts.get(id);
    if (chart) {
      chart.dispose();
      this.charts.delete(id);
    }
  }

  disposeAll(): void {
    this.charts.forEach(chart => chart.dispose());
    this.charts.clear();
  }
}

// Clean up on page unload
window.addEventListener('beforeunload', () => {
  chartManager.disposeAll();
});