'use client';

import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  RadialBarChart,
  RadialBar,
  Legend,
  PolarAngleAxis,
} from 'recharts';

const priceData = [
  { month: 'Jan', price: 0.8, volume: 1200, trend: 65 },
  { month: 'Feb', price: 1.2, volume: 1800, trend: 72 },
  { month: 'Mar', price: 3.5, volume: 4500, trend: 88 },
  { month: 'Apr', price: 2.8, volume: 3200, trend: 78 },
  { month: 'May', price: 4.2, volume: 5800, trend: 92 },
  { month: 'Jun', price: 5.1, volume: 7200, trend: 96 },
];

const performanceData = [
  { name: 'AI Score', value: 94, fill: 'oklch(0.75 0.18 180)' },
  { name: 'Speed', value: 87, fill: 'oklch(0.70 0.20 260)' },
  { name: 'Accuracy', value: 91, fill: 'oklch(0.65 0.18 320)' },
];

const CustomTooltip = ({ active, payload, label }: { active?: boolean; payload?: Array<{ value: number; name: string }>; label?: string }) => {
  if (active && payload && payload.length) {
    return (
      <div className="glass-card rounded-lg p-3 neon-border">
        <p className="text-primary font-semibold mb-1">{label}</p>
        {payload.map((entry, index) => (
          <p key={index} className="text-sm text-foreground">
            {entry.name}: <span className="text-primary">{typeof entry.value === 'number' ? entry.value.toFixed(2) : entry.value}</span>
          </p>
        ))}
      </div>
    );
  }
  return null;
};

export function DemoChart() {
  return (
    <div className="space-y-10 w-full">
      {/* Holographic Price Chart */}
      <div className="relative">
        <div className="absolute -inset-2 bg-primary/10 rounded-2xl blur-xl" />
        <div className="relative glass-card rounded-2xl p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-3 h-3 rounded-full bg-primary animate-pulse" />
            <h4 className="text-lg font-bold gradient-text">
              TMRC Stock Price Analysis
            </h4>
          </div>
          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={priceData}>
                <defs>
                  <linearGradient id="scifiGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="oklch(0.75 0.18 180)" stopOpacity={0.8} />
                    <stop offset="50%" stopColor="oklch(0.70 0.20 260)" stopOpacity={0.4} />
                    <stop offset="100%" stopColor="oklch(0.65 0.18 320)" stopOpacity={0.1} />
                  </linearGradient>
                  <filter id="glow">
                    <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
                    <feMerge>
                      <feMergeNode in="coloredBlur"/>
                      <feMergeNode in="SourceGraphic"/>
                    </feMerge>
                  </filter>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.25 0.04 280 / 0.5)" />
                <XAxis 
                  dataKey="month" 
                  stroke="oklch(0.60 0 0)" 
                  tick={{ fill: 'oklch(0.60 0 0)', fontSize: 12 }}
                  axisLine={{ stroke: 'oklch(0.35 0.06 280)' }}
                />
                <YAxis 
                  stroke="oklch(0.60 0 0)" 
                  tick={{ fill: 'oklch(0.60 0 0)', fontSize: 12 }}
                  tickFormatter={(value) => `$${value}`}
                  axisLine={{ stroke: 'oklch(0.35 0.06 280)' }}
                />
                <Tooltip content={<CustomTooltip />} />
                <Area
                  type="monotone"
                  dataKey="price"
                  stroke="oklch(0.75 0.18 180)"
                  strokeWidth={3}
                  fill="url(#scifiGradient)"
                  filter="url(#glow)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Neon Volume Bars */}
      <div className="relative">
        <div className="absolute -inset-2 bg-accent/10 rounded-2xl blur-xl" />
        <div className="relative glass-card rounded-2xl p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-3 h-3 rounded-full bg-accent animate-pulse" />
            <h4 className="text-lg font-bold text-foreground">
              Trading Volume <span className="text-accent">(K shares)</span>
            </h4>
          </div>
          <div className="h-56 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={priceData}>
                <defs>
                  <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="oklch(0.70 0.20 260)" stopOpacity={1} />
                    <stop offset="100%" stopColor="oklch(0.70 0.20 260)" stopOpacity={0.3} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.25 0.04 280 / 0.5)" />
                <XAxis 
                  dataKey="month" 
                  stroke="oklch(0.60 0 0)" 
                  tick={{ fill: 'oklch(0.60 0 0)', fontSize: 12 }}
                  axisLine={{ stroke: 'oklch(0.35 0.06 280)' }}
                />
                <YAxis 
                  stroke="oklch(0.60 0 0)" 
                  tick={{ fill: 'oklch(0.60 0 0)', fontSize: 12 }}
                  tickFormatter={(value) => `${(value / 1000).toFixed(1)}K`}
                  axisLine={{ stroke: 'oklch(0.35 0.06 280)' }}
                />
                <Tooltip content={<CustomTooltip />} />
                <Bar 
                  dataKey="volume" 
                  fill="url(#barGradient)"
                  radius={[8, 8, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Multi-line Trend Analysis */}
      <div className="relative">
        <div className="absolute -inset-2 bg-chart-3/10 rounded-2xl blur-xl" />
        <div className="relative glass-card rounded-2xl p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-3 h-3 rounded-full bg-chart-3 animate-pulse" />
            <h4 className="text-lg font-bold text-foreground">
              Price & Trend <span className="text-chart-3">Correlation</span>
            </h4>
          </div>
          <div className="h-56 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={priceData}>
                <defs>
                  <filter id="glowLine">
                    <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
                    <feMerge>
                      <feMergeNode in="coloredBlur"/>
                      <feMergeNode in="SourceGraphic"/>
                    </feMerge>
                  </filter>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.25 0.04 280 / 0.5)" />
                <XAxis 
                  dataKey="month" 
                  stroke="oklch(0.60 0 0)" 
                  tick={{ fill: 'oklch(0.60 0 0)', fontSize: 12 }}
                  axisLine={{ stroke: 'oklch(0.35 0.06 280)' }}
                />
                <YAxis 
                  yAxisId="left"
                  stroke="oklch(0.60 0 0)" 
                  tick={{ fill: 'oklch(0.60 0 0)', fontSize: 12 }}
                  tickFormatter={(value) => `$${value}`}
                  axisLine={{ stroke: 'oklch(0.35 0.06 280)' }}
                />
                <YAxis 
                  yAxisId="right"
                  orientation="right"
                  stroke="oklch(0.60 0 0)" 
                  tick={{ fill: 'oklch(0.60 0 0)', fontSize: 12 }}
                  tickFormatter={(value) => `${value}%`}
                  axisLine={{ stroke: 'oklch(0.35 0.06 280)' }}
                />
                <Tooltip content={<CustomTooltip />} />
                <Line 
                  yAxisId="left"
                  type="monotone" 
                  dataKey="price" 
                  stroke="oklch(0.75 0.18 180)" 
                  strokeWidth={3}
                  dot={{ fill: 'oklch(0.75 0.18 180)', strokeWidth: 0, r: 6 }}
                  activeDot={{ r: 10, fill: 'oklch(0.85 0.20 180)' }}
                  filter="url(#glowLine)"
                />
                <Line 
                  yAxisId="right"
                  type="monotone" 
                  dataKey="trend" 
                  stroke="oklch(0.65 0.18 320)" 
                  strokeWidth={3}
                  strokeDasharray="5 5"
                  dot={{ fill: 'oklch(0.65 0.18 320)', strokeWidth: 0, r: 4 }}
                  activeDot={{ r: 8, fill: 'oklch(0.75 0.20 320)' }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <div className="flex justify-center gap-8 mt-4">
            <div className="flex items-center gap-2">
              <div className="w-4 h-1 rounded bg-primary" />
              <span className="text-sm text-muted-foreground">Price</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-1 rounded bg-chart-3" style={{ borderStyle: 'dashed' }} />
              <span className="text-sm text-muted-foreground">Trend</span>
            </div>
          </div>
        </div>
      </div>

      {/* AI Performance Radial */}
      <div className="relative">
        <div className="absolute -inset-2 bg-primary/10 rounded-2xl blur-xl" />
        <div className="relative glass-card rounded-2xl p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-3 h-3 rounded-full bg-primary animate-pulse" />
            <h4 className="text-lg font-bold gradient-text">
              AI Performance Metrics
            </h4>
          </div>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <RadialBarChart 
                cx="50%" 
                cy="50%" 
                innerRadius="30%" 
                outerRadius="90%" 
                data={performanceData}
                startAngle={180}
                endAngle={0}
              >
                <PolarAngleAxis type="number" domain={[0, 100]} angleAxisId={0} tick={false} />
                <RadialBar
                  background={{ fill: 'oklch(0.20 0.03 280)' }}
                  dataKey="value"
                  cornerRadius={10}
                />
                <Legend 
                  iconSize={10}
                  layout="horizontal"
                  verticalAlign="bottom"
                  wrapperStyle={{ paddingTop: '20px' }}
                  formatter={(value) => <span className="text-foreground text-sm">{value}</span>}
                />
              </RadialBarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
