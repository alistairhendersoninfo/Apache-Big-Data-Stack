// src/charts/barChart.js
import * as d3 from 'd3';

export class InteractiveBarChart {
  constructor(selector, options = {}) {
    this.selector = selector;
    this.margin = options.margin || { top: 20, right: 20, bottom: 40, left: 60 };
    this.colorScheme = options.colorScheme || d3.schemeCategory10;

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

    // Scales
    this.xScale = d3.scaleBand()
      .range([0, this.width])
      .padding(0.2);

    this.yScale = d3.scaleLinear()
      .range([this.height, 0]);

    this.colorScale = d3.scaleOrdinal(this.colorScheme);

    // Axes
    this.xAxis = this.svg.append('g')
      .attr('class', 'x-axis')
      .attr('transform', `translate(0,${this.height})`);

    this.yAxis = this.svg.append('g')
      .attr('class', 'y-axis');

    // Y-axis label
    this.svg.append('text')
      .attr('class', 'y-axis-label')
      .attr('transform', 'rotate(-90)')
      .attr('y', -this.margin.left + 15)
      .attr('x', -this.height / 2)
      .attr('text-anchor', 'middle')
      .text('Count');

    // Tooltip
    this.tooltip = d3.select('body').append('div')
      .attr('class', 'd3-tooltip')
      .style('opacity', 0);
  }

  update(data) {
    // data: [{ category: 'A', value: 100 }, ...]

    // Update scales
    this.xScale.domain(data.map(d => d.category));
    this.yScale.domain([0, d3.max(data, d => d.value) * 1.1]);
    this.colorScale.domain(data.map(d => d.category));

    // Update axes
    this.xAxis.transition().duration(500)
      .call(d3.axisBottom(this.xScale))
      .selectAll('text')
      .attr('transform', 'rotate(-45)')
      .style('text-anchor', 'end');

    this.yAxis.transition().duration(500)
      .call(d3.axisLeft(this.yScale).ticks(5).tickFormat(d3.format('.2s')));

    // Data join
    const bars = this.svg.selectAll('.bar')
      .data(data, d => d.category);

    // Exit
    bars.exit()
      .transition().duration(300)
      .attr('y', this.height)
      .attr('height', 0)
      .remove();

    // Enter
    const barsEnter = bars.enter()
      .append('rect')
      .attr('class', 'bar')
      .attr('x', d => this.xScale(d.category))
      .attr('width', this.xScale.bandwidth())
      .attr('y', this.height)
      .attr('height', 0)
      .attr('fill', d => this.colorScale(d.category))
      .attr('rx', 4);

    // Update (merge enter + update)
    bars.merge(barsEnter)
      .on('mouseover', (event, d) => {
        d3.select(event.target)
          .transition().duration(100)
          .attr('opacity', 0.8)
          .attr('transform', 'scale(1.02)');

        this.tooltip
          .style('opacity', 1)
          .html(`
            <strong>${d.category}</strong><br/>
            Count: ${d.value.toLocaleString()}<br/>
            Percentage: ${((d.value / d3.sum(data, x => x.value)) * 100).toFixed(1)}%
          `)
          .style('left', (event.pageX + 15) + 'px')
          .style('top', (event.pageY - 28) + 'px');
      })
      .on('mouseout', (event) => {
        d3.select(event.target)
          .transition().duration(100)
          .attr('opacity', 1)
          .attr('transform', 'scale(1)');

        this.tooltip.style('opacity', 0);
      })
      .on('click', (event, d) => {
        // Dispatch custom event for filtering
        const customEvent = new CustomEvent('categorySelected', {
          detail: { category: d.category }
        });
        document.dispatchEvent(customEvent);
      })
      .transition().duration(500)
      .attr('x', d => this.xScale(d.category))
      .attr('width', this.xScale.bandwidth())
      .attr('y', d => this.yScale(d.value))
      .attr('height', d => this.height - this.yScale(d.value))
      .attr('fill', d => this.colorScale(d.category));
  }
}