// src/charts/heatmap.js
import * as d3 from 'd3';

export class ActivityHeatmap {
  constructor(selector, options = {}) {
    this.selector = selector;
    this.margin = options.margin || { top: 30, right: 30, bottom: 30, left: 60 };
    this.days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    this.hours = d3.range(24);

    this.init();
  }

  init() {
    const container = d3.select(this.selector);
    const bbox = container.node().getBoundingClientRect();

    this.width = bbox.width - this.margin.left - this.margin.right;
    this.height = bbox.height - this.margin.top - this.margin.bottom;

    container.selectAll('*').remove();

    this.svg = container
      .attr('width', this.width + this.margin.left + this.margin.right)
      .attr('height', this.height + this.margin.top + this.margin.bottom)
      .append('g')
      .attr('transform', `translate(${this.margin.left},${this.margin.top})`);

    // Calculate cell dimensions
    this.cellWidth = this.width / 24;
    this.cellHeight = this.height / 7;

    // Color scale
    this.colorScale = d3.scaleSequential(d3.interpolateYlOrRd)
      .domain([0, 100]);

    // X axis (hours)
    this.svg.append('g')
      .attr('class', 'x-axis')
      .selectAll('text')
      .data(this.hours)
      .enter()
      .append('text')
      .attr('x', (d, i) => i * this.cellWidth + this.cellWidth / 2)
      .attr('y', -10)
      .attr('text-anchor', 'middle')
      .attr('font-size', '10px')
      .text(d => d + ':00');

    // Y axis (days)
    this.svg.append('g')
      .attr('class', 'y-axis')
      .selectAll('text')
      .data(this.days)
      .enter()
      .append('text')
      .attr('x', -10)
      .attr('y', (d, i) => i * this.cellHeight + this.cellHeight / 2)
      .attr('text-anchor', 'end')
      .attr('dominant-baseline', 'middle')
      .attr('font-size', '11px')
      .text(d => d);

    // Tooltip
    this.tooltip = d3.select('body').append('div')
      .attr('class', 'd3-tooltip')
      .style('opacity', 0);
  }

  update(data) {
    // data: [{ day: 0-6, hour: 0-23, value: number }, ...]

    // Update color scale domain
    const maxValue = d3.max(data, d => d.value) || 100;
    this.colorScale.domain([0, maxValue]);

    // Data join for cells
    const cells = this.svg.selectAll('.cell')
      .data(data, d => `${d.day}-${d.hour}`);

    // Enter
    cells.enter()
      .append('rect')
      .attr('class', 'cell')
      .attr('x', d => d.hour * this.cellWidth)
      .attr('y', d => d.day * this.cellHeight)
      .attr('width', this.cellWidth - 2)
      .attr('height', this.cellHeight - 2)
      .attr('rx', 3)
      .attr('fill', '#eee')
      .on('mouseover', (event, d) => {
        this.tooltip
          .style('opacity', 1)
          .html(`
            <strong>${this.days[d.day]} ${d.hour}:00</strong><br/>
            Events: ${d.value.toLocaleString()}
          `)
          .style('left', (event.pageX + 15) + 'px')
          .style('top', (event.pageY - 28) + 'px');
      })
      .on('mouseout', () => {
        this.tooltip.style('opacity', 0);
      })
      .merge(cells)
      .transition().duration(300)
      .attr('fill', d => this.colorScale(d.value));

    // Exit
    cells.exit().remove();

    // Add/update legend
    this.updateLegend(maxValue);
  }

  updateLegend(maxValue) {
    // Remove existing legend
    this.svg.selectAll('.legend').remove();

    const legendWidth = 200;
    const legendHeight = 10;

    const legend = this.svg.append('g')
      .attr('class', 'legend')
      .attr('transform', `translate(${this.width - legendWidth}, ${this.height + 15})`);

    // Gradient
    const defs = this.svg.append('defs');
    const gradient = defs.append('linearGradient')
      .attr('id', 'heatmap-gradient');

    gradient.selectAll('stop')
      .data(d3.range(0, 1.1, 0.1))
      .enter()
      .append('stop')
      .attr('offset', d => `${d * 100}%`)
      .attr('stop-color', d => this.colorScale(d * maxValue));

    legend.append('rect')
      .attr('width', legendWidth)
      .attr('height', legendHeight)
      .attr('fill', 'url(#heatmap-gradient)');

    legend.append('text')
      .attr('x', 0)
      .attr('y', legendHeight + 12)
      .attr('font-size', '10px')
      .text('0');

    legend.append('text')
      .attr('x', legendWidth)
      .attr('y', legendHeight + 12)
      .attr('text-anchor', 'end')
      .attr('font-size', '10px')
      .text(maxValue.toLocaleString());
  }
}