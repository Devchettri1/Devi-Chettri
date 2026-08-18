import React, { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';
import { TourPackage, CabOption } from '../types';
import { BarChart3, TrendingUp, Sparkles, Layers, ShieldCheck, Car, Calendar, DollarSign, ArrowUpRight } from 'lucide-react';

interface D3ComparisonChartProps {
  type: 'packages' | 'cabs';
  packages?: TourPackage[];
  cabs?: CabOption[];
  onSelectForBooking: (title: string) => void;
}

type PackageMetric = 'totalPrice' | 'perDayPrice' | 'deluxeVsLuxury';
type CabMetric = 'dailyRate' | 'airportRate' | 'perSeatCost';

export const D3ComparisonChart: React.FC<D3ComparisonChartProps> = ({
  type,
  packages = [],
  cabs = [],
  onSelectForBooking,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);

  const [packageMetric, setPackageMetric] = useState<PackageMetric>('totalPrice');
  const [cabMetric, setCabMetric] = useState<CabMetric>('dailyRate');
  const [selectedItemTitle, setSelectedItemTitle] = useState<string | null>(null);

  // Helper to extract days count from duration string (e.g. "5 Nights / 6 Days" -> 6)
  const extractDays = (durationStr: string): number => {
    const match = durationStr.match(/(\d+)\s*(?:Day|Days|D)/i);
    if (match && match[1]) {
      return parseInt(match[1], 10);
    }
    const nightMatch = durationStr.match(/(\d+)\s*(?:Night|Nights|N)/i);
    if (nightMatch && nightMatch[1]) {
      return parseInt(nightMatch[1], 10) + 1;
    }
    return 5; // fallback
  };

  // Helper to extract passenger capacity number
  const extractCapacity = (capacityStr: string): number => {
    const match = capacityStr.match(/(\d+)/);
    return match ? parseInt(match[1], 10) : 6;
  };

  useEffect(() => {
    if (!svgRef.current || !containerRef.current) return;

    // Clear previous SVG contents
    const svg = d3.select(svgRef.current);
    svg.selectAll('*').remove();

    const containerWidth = containerRef.current.clientWidth || 700;
    const height = Math.max(340, Math.min(420, window.innerHeight * 0.45));
    const margin = { top: 35, right: 30, bottom: 85, left: 65 };
    const width = containerWidth - margin.left - margin.right;
    const chartHeight = height - margin.top - margin.bottom;

    svg
      .attr('width', containerWidth)
      .attr('height', height)
      .attr('viewBox', `0 0 ${containerWidth} ${height}`);

    // Create defs for gradients
    const defs = svg.append('defs');

    // Cyan/Teal Gradient for Packages
    const cyanGrad = defs
      .append('linearGradient')
      .attr('id', 'cyanBarGradient')
      .attr('x1', '0%')
      .attr('y1', '0%')
      .attr('x2', '0%')
      .attr('y2', '100%');
    cyanGrad.append('stop').attr('offset', '0%').attr('stop-color', '#38bdf8');
    cyanGrad.append('stop').attr('offset', '100%').attr('stop-color', '#0284c7');

    // Amber/Gold Gradient for Cabs
    const amberGrad = defs
      .append('linearGradient')
      .attr('id', 'amberBarGradient')
      .attr('x1', '0%')
      .attr('y1', '0%')
      .attr('x2', '0%')
      .attr('y2', '100%');
    amberGrad.append('stop').attr('offset', '0%').attr('stop-color', '#fbbf24');
    amberGrad.append('stop').attr('offset', '100%').attr('stop-color', '#d97706');

    // Emerald Gradient for Alternative/Luxury
    const emeraldGrad = defs
      .append('linearGradient')
      .attr('id', 'emeraldBarGradient')
      .attr('x1', '0%')
      .attr('y1', '0%')
      .attr('x2', '0%')
      .attr('y2', '100%');
    emeraldGrad.append('stop').attr('offset', '0%').attr('stop-color', '#34d399');
    emeraldGrad.append('stop').attr('offset', '100%').attr('stop-color', '#059669');

    // Rose Gradient for High Tier
    const roseGrad = defs
      .append('linearGradient')
      .attr('id', 'roseBarGradient')
      .attr('x1', '0%')
      .attr('y1', '0%')
      .attr('x2', '0%')
      .attr('y2', '100%');
    roseGrad.append('stop').attr('offset', '0%').attr('stop-color', '#f43f5e');
    roseGrad.append('stop').attr('offset', '100%').attr('stop-color', '#be123c');

    // Glow filter
    const filter = defs.append('filter').attr('id', 'glow').attr('x', '-20%').attr('y', '-20%').attr('width', '140%').attr('height', '140%');
    filter.append('feGaussianBlur').attr('stdDeviation', '4').attr('result', 'blur');
    filter.append('feComposite').attr('in', 'SourceGraphic').attr('in2', 'blur').attr('operator', 'over');

    const g = svg
      .append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);

    // Prepare chart data based on modal type and metric
    let chartData: Array<{
      id: string;
      label: string;
      subLabel: string;
      value: number;
      secondaryValue?: number;
      secondaryLabel?: string;
      rawValue: number;
      durationText?: string;
      category?: string;
      rawObject: TourPackage | CabOption;
    }> = [];

    if (type === 'packages') {
      const displayPackages = packages.length > 0 ? packages.slice(0, 6) : [];
      chartData = displayPackages.map((pkg) => {
        const days = extractDays(pkg.duration);
        let val = pkg.priceStarting;
        let secVal: number | undefined = undefined;

        if (packageMetric === 'perDayPrice') {
          val = Math.round(pkg.priceStarting / days);
        } else if (packageMetric === 'deluxeVsLuxury') {
          val = pkg.hotelTiers?.deluxe.price || pkg.priceStarting;
          secVal = pkg.hotelTiers?.luxury.price || Math.round(pkg.priceStarting * 1.5);
        }

        // Clean label
        const shortTitle = pkg.title.length > 22 ? pkg.title.substring(0, 20) + '...' : pkg.title;

        return {
          id: pkg.id,
          label: shortTitle,
          subLabel: pkg.duration,
          value: val,
          secondaryValue: secVal,
          secondaryLabel: 'Luxury 4★ Stay',
          rawValue: pkg.priceStarting,
          durationText: pkg.duration,
          category: pkg.category,
          rawObject: pkg,
        };
      });
    } else {
      // Cab Comparison Data
      const displayCabs = cabs.length > 0 ? cabs.slice(0, 6) : [];
      chartData = displayCabs.map((cab) => {
        let val = cab.ratePerDay;
        const capacityNum = extractCapacity(cab.capacity);

        if (cabMetric === 'airportRate') {
          val = cab.njpIxbPickupRate;
        } else if (cabMetric === 'perSeatCost') {
          val = Math.round(cab.ratePerDay / Math.max(1, capacityNum));
        }

        return {
          id: cab.id,
          label: cab.model,
          subLabel: cab.type,
          value: val,
          rawValue: cab.ratePerDay,
          category: cab.capacity,
          rawObject: cab,
        };
      });
    }

    if (chartData.length === 0) return;

    // X scale
    const x0 = d3
      .scaleBand()
      .domain(chartData.map((d) => d.label))
      .rangeRound([0, width])
      .paddingInner(0.35)
      .paddingOuter(0.2);

    // Max value for Y scale
    const maxValue = d3.max(chartData, (d) => Math.max(d.value, d.secondaryValue || 0)) || 10000;
    const y = d3
      .scaleLinear()
      .domain([0, maxValue * 1.18])
      .nice()
      .rangeRound([chartHeight, 0]);

    // Grid lines (horizontal)
    const yAxisGrid = d3
      .axisLeft(y)
      .tickSize(-width)
      .tickFormat(() => '')
      .ticks(5);

    g.append('g')
      .attr('class', 'grid-lines')
      .call(yAxisGrid)
      .selectAll('line')
      .attr('stroke', 'rgba(255, 255, 255, 0.07)')
      .attr('stroke-dasharray', '3,3');

    g.select('.grid-lines').select('.domain').remove();

    // Y Axis
    const yAxis = d3
      .axisLeft(y)
      .ticks(5)
      .tickFormat((d) => `₹${d3.format(',.0f')(d as number)}`);

    const yAxisGroup = g.append('g').attr('class', 'y-axis').call(yAxis);
    yAxisGroup.select('.domain').attr('stroke', 'rgba(255, 255, 255, 0.2)');
    yAxisGroup.selectAll('text').attr('fill', '#94a3b8').attr('font-size', '10px').attr('font-family', 'sans-serif');

    // X Axis
    const xAxis = d3.axisBottom(x0);
    const xAxisGroup = g
      .append('g')
      .attr('class', 'x-axis')
      .attr('transform', `translate(0,${chartHeight})`)
      .call(xAxis);

    xAxisGroup.select('.domain').attr('stroke', 'rgba(255, 255, 255, 0.2)');
    xAxisGroup
      .selectAll('text')
      .attr('fill', '#cbd5e1')
      .attr('font-size', '11px')
      .attr('font-weight', '600')
      .attr('transform', 'rotate(-18)')
      .style('text-anchor', 'end')
      .attr('dx', '-0.5em')
      .attr('dy', '0.6em');

    const tooltip = d3.select(tooltipRef.current);

    // Grouped bars or single bar
    const isGrouped = packageMetric === 'deluxeVsLuxury' && type === 'packages';

    if (isGrouped) {
      // Sub-band for deluxe vs luxury
      const x1 = d3.scaleBand().domain(['Deluxe', 'Luxury']).rangeRound([0, x0.bandwidth()]).padding(0.08);

      const barGroups = g
        .selectAll('.bar-group')
        .data(chartData)
        .enter()
        .append('g')
        .attr('class', 'bar-group')
        .attr('transform', (d) => `translate(${x0(d.label)}, 0)`);

      // Deluxe bar
      barGroups
        .append('rect')
        .attr('class', 'bar bar-deluxe')
        .attr('x', () => x1('Deluxe') || 0)
        .attr('y', chartHeight)
        .attr('width', x1.bandwidth())
        .attr('height', 0)
        .attr('rx', 4)
        .attr('ry', 4)
        .attr('fill', 'url(#cyanBarGradient)')
        .style('cursor', 'pointer')
        .on('mouseenter', function (event, d) {
          d3.select(this).attr('filter', 'url(#glow)');
          showTooltip(event, d, 'Deluxe 3★ Stay', d.value);
        })
        .on('mousemove', function (event) {
          moveTooltip(event);
        })
        .on('mouseleave', function () {
          d3.select(this).attr('filter', null);
          hideTooltip();
        })
        .on('click', function (event, d) {
          handleBarClick(d.rawObject);
        })
        .transition()
        .duration(800)
        .ease(d3.easeCubicOut)
        .attr('y', (d) => y(d.value))
        .attr('height', (d) => chartHeight - y(d.value));

      // Luxury bar
      barGroups
        .append('rect')
        .attr('class', 'bar bar-luxury')
        .attr('x', () => x1('Luxury') || 0)
        .attr('y', chartHeight)
        .attr('width', x1.bandwidth())
        .attr('height', 0)
        .attr('rx', 4)
        .attr('ry', 4)
        .attr('fill', 'url(#roseBarGradient)')
        .style('cursor', 'pointer')
        .on('mouseenter', function (event, d) {
          d3.select(this).attr('filter', 'url(#glow)');
          showTooltip(event, d, 'Luxury 4★ Stay', d.secondaryValue || d.value);
        })
        .on('mousemove', function (event) {
          moveTooltip(event);
        })
        .on('mouseleave', function () {
          d3.select(this).attr('filter', null);
          hideTooltip();
        })
        .on('click', function (event, d) {
          handleBarClick(d.rawObject);
        })
        .transition()
        .duration(800)
        .delay(100)
        .ease(d3.easeCubicOut)
        .attr('y', (d) => y(d.secondaryValue || d.value))
        .attr('height', (d) => chartHeight - y(d.secondaryValue || d.value));

      // Labels on top of Deluxe bars
      barGroups
        .append('text')
        .attr('class', 'bar-label text-[10px]')
        .attr('x', () => (x1('Deluxe') || 0) + x1.bandwidth() / 2)
        .attr('y', (d) => y(d.value) - 5)
        .attr('text-anchor', 'middle')
        .attr('fill', '#38bdf8')
        .attr('font-size', '9px')
        .attr('font-weight', 'bold')
        .text((d) => `₹${(d.value / 1000).toFixed(1)}k`);

      // Labels on top of Luxury bars
      barGroups
        .append('text')
        .attr('class', 'bar-label text-[10px]')
        .attr('x', () => (x1('Luxury') || 0) + x1.bandwidth() / 2)
        .attr('y', (d) => y(d.secondaryValue || d.value) - 5)
        .attr('text-anchor', 'middle')
        .attr('fill', '#f43f5e')
        .attr('font-size', '9px')
        .attr('font-weight', 'bold')
        .text((d) => `₹${((d.secondaryValue || d.value) / 1000).toFixed(1)}k`);

    } else {
      // Standard Single Bars
      const bars = g
        .selectAll('.bar')
        .data(chartData)
        .enter()
        .append('rect')
        .attr('class', 'bar')
        .attr('x', (d) => x0(d.label) || 0)
        .attr('y', chartHeight)
        .attr('width', x0.bandwidth())
        .attr('height', 0)
        .attr('rx', 6)
        .attr('ry', 6)
        .attr('fill', type === 'packages' ? 'url(#cyanBarGradient)' : 'url(#amberBarGradient)')
        .style('cursor', 'pointer')
        .on('mouseenter', function (event, d) {
          d3.select(this).attr('filter', 'url(#glow)');
          showTooltip(event, d);
        })
        .on('mousemove', function (event) {
          moveTooltip(event);
        })
        .on('mouseleave', function () {
          d3.select(this).attr('filter', null);
          hideTooltip();
        })
        .on('click', function (event, d) {
          handleBarClick(d.rawObject);
        });

      // Animate single bar heights
      bars
        .transition()
        .duration(850)
        .delay((_, i) => i * 60)
        .ease(d3.easeCubicOut)
        .attr('y', (d) => y(d.value))
        .attr('height', (d) => chartHeight - y(d.value));

      // Value text labels on top of bars
      g.selectAll('.bar-label')
        .data(chartData)
        .enter()
        .append('text')
        .attr('class', 'bar-label')
        .attr('x', (d) => (x0(d.label) || 0) + x0.bandwidth() / 2)
        .attr('y', (d) => y(d.value) - 7)
        .attr('text-anchor', 'middle')
        .attr('fill', type === 'packages' ? '#38bdf8' : '#fbbf24')
        .attr('font-size', '10px')
        .attr('font-weight', 'bold')
        .attr('opacity', 0)
        .text((d) => `₹${d.value.toLocaleString('en-IN')}`)
        .transition()
        .duration(900)
        .delay((_, i) => i * 60 + 200)
        .attr('opacity', 1);

      // Duration / Sub-label inside bar (if space permits)
      g.selectAll('.bar-sublabel')
        .data(chartData)
        .enter()
        .append('text')
        .attr('class', 'bar-sublabel')
        .attr('x', (d) => (x0(d.label) || 0) + x0.bandwidth() / 2)
        .attr('y', (d) => Math.min(chartHeight - 8, y(d.value) + 16))
        .attr('text-anchor', 'middle')
        .attr('fill', '#02182B')
        .attr('font-size', '9px')
        .attr('font-weight', '900')
        .attr('opacity', 0)
        .text((d) => (type === 'packages' ? d.durationText?.split('/')[0]?.trim() || '' : d.category?.split(' ')[0] || ''))
        .transition()
        .duration(900)
        .delay((_, i) => i * 60 + 300)
        .attr('opacity', 0.9);
    }

    // Tooltip Handlers
    function showTooltip(event: MouseEvent, d: any, customTitle?: string, customVal?: number) {
      if (!tooltipRef.current) return;
      const t = d3.select(tooltipRef.current);
      const isPkg = type === 'packages';
      const raw = d.rawObject;
      const displayVal = customVal !== undefined ? customVal : d.value;

      let html = '';
      if (isPkg) {
        const pkg = raw as TourPackage;
        html = `
          <div class="space-y-1.5 min-w-[210px]">
            <div class="flex items-center justify-between gap-2 border-b border-cyan-500/20 pb-1">
              <span class="font-bold text-xs text-white">${customTitle || pkg.title}</span>
              <span class="text-[10px] bg-cyan-950 text-cyan-300 font-mono px-1.5 py-0.5 rounded border border-cyan-800">${pkg.duration}</span>
            </div>
            <div class="text-sm font-black text-amber-300">
              ₹${displayVal.toLocaleString('en-IN')} <span class="text-[10px] font-normal text-slate-400">/ person</span>
            </div>
            <div class="text-[11px] text-slate-300 flex items-center justify-between">
              <span>⭐ ${pkg.rating} (${pkg.reviewsCount} reviews)</span>
              <span class="${pkg.permitsRequired ? 'text-emerald-400 font-bold' : 'text-slate-400'}">${pkg.permitsRequired ? '✓ Army Permit' : 'No Permit'}</span>
            </div>
            <div class="text-[10px] text-cyan-400 font-semibold pt-1 border-t border-white/5 flex items-center justify-between">
              <span>Click to select for booking</span>
              <span>→</span>
            </div>
          </div>
        `;
      } else {
        const cab = raw as CabOption;
        html = `
          <div class="space-y-1.5 min-w-[200px]">
            <div class="flex items-center justify-between gap-2 border-b border-amber-500/20 pb-1">
              <span class="font-bold text-xs text-white">${cab.model}</span>
              <span class="text-[10px] bg-amber-950 text-amber-300 font-mono px-1.5 py-0.5 rounded border border-amber-800">${cab.capacity}</span>
            </div>
            <div class="text-sm font-black text-amber-300">
              ₹${displayVal.toLocaleString('en-IN')} <span class="text-[10px] font-normal text-slate-400">${cabMetric === 'airportRate' ? 'NJP/Airport Pickup' : cabMetric === 'perSeatCost' ? '/ Seat / Day' : '/ Day Tariff'}</span>
            </div>
            <div class="text-[11px] text-slate-300">
              <strong class="text-slate-400">Best for:</strong> ${cab.bestFor.length > 45 ? cab.bestFor.substring(0, 42) + '...' : cab.bestFor}
            </div>
            <div class="text-[10px] text-amber-400 font-semibold pt-1 border-t border-white/5 flex items-center justify-between">
              <span>Click to reserve vehicle</span>
              <span>→</span>
            </div>
          </div>
        `;
      }

      t.html(html)
        .style('opacity', 1)
        .style('display', 'block');

      moveTooltip(event);
    }

    function moveTooltip(event: MouseEvent) {
      if (!tooltipRef.current || !containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;

      const tooltipWidth = 240;
      const leftPos = x + tooltipWidth + 20 > containerWidth ? x - tooltipWidth - 10 : x + 15;
      const topPos = Math.max(10, y - 60);

      d3.select(tooltipRef.current)
        .style('left', `${leftPos}px`)
        .style('top', `${topPos}px`);
    }

    function hideTooltip() {
      if (!tooltipRef.current) return;
      d3.select(tooltipRef.current).style('opacity', 0).style('display', 'none');
    }

    function handleBarClick(rawObject: TourPackage | CabOption) {
      if (type === 'packages') {
        const pkg = rawObject as TourPackage;
        setSelectedItemTitle(pkg.title);
        onSelectForBooking(pkg.title);
      } else {
        const cab = rawObject as CabOption;
        setSelectedItemTitle(cab.model);
        onSelectForBooking(`Cab Rental: ${cab.model}`);
      }
    }

  }, [type, packages, cabs, packageMetric, cabMetric]);

  return (
    <div className="bg-[#051322] border border-cyan-500/30 rounded-2xl p-5 shadow-2xl space-y-4 relative overflow-hidden" ref={containerRef}>
      {/* Visual Chart Header & Metric Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-3">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-xl bg-cyan-950/80 border border-cyan-600/40 text-cyan-300">
            <BarChart3 className="w-4 h-4" />
          </div>
          <div>
            <h3 className="font-serif font-bold text-sm sm:text-base text-white flex items-center gap-2">
              <span>{type === 'packages' ? 'D3 Price & Duration Distribution' : 'D3 Vehicle Fleet Pricing Engine'}</span>
              <span className="text-[10px] font-mono bg-cyan-900/60 text-cyan-300 px-2 py-0.5 rounded-full border border-cyan-700/50">
                Interactive
              </span>
            </h3>
            <p className="text-[11px] text-slate-400">
              {type === 'packages'
                ? 'Compare starting tariffs, per-day cost, and hotel tiers across durations'
                : 'Compare daily rental rates, airport pickups, and per-seat vehicle costs'}
            </p>
          </div>
        </div>

        {/* Metric Selector Pills */}
        <div className="flex items-center bg-[#071a2d] p-1 rounded-xl border border-slate-800 text-[11px] font-semibold">
          {type === 'packages' ? (
            <>
              <button
                type="button"
                onClick={() => setPackageMetric('totalPrice')}
                className={`px-3 py-1.5 rounded-lg transition-all ${
                  packageMetric === 'totalPrice'
                    ? 'bg-cyan-900 text-cyan-200 font-bold border border-cyan-700/80 shadow-md'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                Starting Package
              </button>
              <button
                type="button"
                onClick={() => setPackageMetric('perDayPrice')}
                className={`px-3 py-1.5 rounded-lg transition-all ${
                  packageMetric === 'perDayPrice'
                    ? 'bg-cyan-900 text-cyan-200 font-bold border border-cyan-700/80 shadow-md'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                Cost / Day
              </button>
              <button
                type="button"
                onClick={() => setPackageMetric('deluxeVsLuxury')}
                className={`px-3 py-1.5 rounded-lg transition-all ${
                  packageMetric === 'deluxeVsLuxury'
                    ? 'bg-rose-950 text-rose-200 font-bold border border-rose-800 shadow-md'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                3★ vs 4★ Luxury
              </button>
            </>
          ) : (
            <>
              <button
                type="button"
                onClick={() => setCabMetric('dailyRate')}
                className={`px-3 py-1.5 rounded-lg transition-all ${
                  cabMetric === 'dailyRate'
                    ? 'bg-amber-950 text-amber-200 font-bold border border-amber-800 shadow-md'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                Daily Tariff
              </button>
              <button
                type="button"
                onClick={() => setCabMetric('airportRate')}
                className={`px-3 py-1.5 rounded-lg transition-all ${
                  cabMetric === 'airportRate'
                    ? 'bg-amber-950 text-amber-200 font-bold border border-amber-800 shadow-md'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                NJP/Airport Pickup
              </button>
              <button
                type="button"
                onClick={() => setCabMetric('perSeatCost')}
                className={`px-3 py-1.5 rounded-lg transition-all ${
                  cabMetric === 'perSeatCost'
                    ? 'bg-amber-950 text-amber-200 font-bold border border-amber-800 shadow-md'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                Cost / Seat / Day
              </button>
            </>
          )}
        </div>
      </div>

      {/* SVG Canvas Container */}
      <div className="w-full overflow-x-auto relative">
        <svg ref={svgRef} className="w-full select-none" />

        {/* Floating D3 Tooltip */}
        <div
          ref={tooltipRef}
          className="absolute z-20 pointer-events-none hidden bg-[#030d18]/95 backdrop-blur-md p-3.5 rounded-xl border border-cyan-500/40 shadow-2xl text-slate-100 transition-opacity duration-150"
          style={{ minWidth: '220px' }}
        />
      </div>

      {/* Legend & Quick Insights Footer */}
      <div className="flex flex-wrap items-center justify-between gap-3 text-[11px] text-slate-400 border-t border-slate-800/80 pt-3">
        <div className="flex items-center gap-4">
          {type === 'packages' ? (
            packageMetric === 'deluxeVsLuxury' ? (
              <>
                <div className="flex items-center gap-1.5">
                  <span className="w-3 h-3 rounded bg-gradient-to-b from-sky-400 to-sky-600" />
                  <span className="text-slate-300">Deluxe 3★ Tier</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-3 h-3 rounded bg-gradient-to-b from-rose-400 to-rose-600" />
                  <span className="text-slate-300">Luxury 4★ Alpine Tier</span>
                </div>
              </>
            ) : (
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded bg-gradient-to-b from-sky-400 to-sky-600" />
                <span className="text-slate-300">
                  {packageMetric === 'perDayPrice' ? 'Average Per-Day Rate (Stay + Cab + Permit)' : 'Starting Package Rate / Person'}
                </span>
              </div>
            )
          ) : (
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded bg-gradient-to-b from-amber-400 to-amber-600" />
              <span className="text-slate-300">
                {cabMetric === 'dailyRate' ? 'Daily Vehicle Tariff' : cabMetric === 'airportRate' ? 'One-way NJP/IXB Airport Transfer' : 'Cost Per Passenger Seat'}
              </span>
            </div>
          )}
        </div>

        <div className="text-[10px] text-slate-400 flex items-center gap-1.5">
          <Sparkles className="w-3 h-3 text-amber-400" />
          <span>Click any bar to instantly select for custom quotation</span>
        </div>
      </div>
    </div>
  );
};
