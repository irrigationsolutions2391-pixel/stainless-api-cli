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
} from 'recharts';

const priceData = [
  { month: 'Jan', price: 0.8, volume: 1200 },
  { month: 'Feb', price: 1.2, volume: 1800 },
  { month: 'Mar', price: 3.5, volume: 4500 },
  { month: 'Apr', price: 2.8, volume: 3200 },
  { month: 'May', price: 4.2, volume: 5800 },
  { month: 'Jun', price: 5.1, volume: 7200 },
];

export function DemoChart() {
  return (
    <div className="space-y-8 w-full">
      {/* Price Area Chart */}
      <div>
        <h4 className="text-lg font-semibold text-primary mb-4">
          TMRC Stock Price ($)
        </h4>
        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={priceData}>
              <defs>
                <linearGradient id="priceGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="oklch(0.696 0.17 162.48)" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="oklch(0.696 0.17 162.48)" stopOpacity={0.1} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.30 0.01 270)" />
              <XAxis 
                dataKey="month" 
                stroke="oklch(0.65 0 0)" 
                tick={{ fill: 'oklch(0.65 0 0)' }}
              />
              <YAxis 
                stroke="oklch(0.65 0 0)" 
                tick={{ fill: 'oklch(0.65 0 0)' }}
                tickFormatter={(value) => `$${value}`}
              />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'oklch(0.18 0.01 270)', 
                  border: '1px solid oklch(0.30 0.01 270)',
                  borderRadius: '8px',
                  color: 'white'
                }}
                formatter={(value: number) => [`$${value.toFixed(2)}`, 'Price']}
              />
              <Area
                type="monotone"
                dataKey="price"
                stroke="oklch(0.696 0.17 162.48)"
                strokeWidth={2}
                fill="url(#priceGradient)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Volume Bar Chart */}
      <div>
        <h4 className="text-lg font-semibold text-primary mb-4">
          Trading Volume (K shares)
        </h4>
        <div className="h-48 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={priceData}>
              <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.30 0.01 270)" />
              <XAxis 
                dataKey="month" 
                stroke="oklch(0.65 0 0)" 
                tick={{ fill: 'oklch(0.65 0 0)' }}
              />
              <YAxis 
                stroke="oklch(0.65 0 0)" 
                tick={{ fill: 'oklch(0.65 0 0)' }}
                tickFormatter={(value) => `${(value / 1000).toFixed(1)}K`}
              />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'oklch(0.18 0.01 270)', 
                  border: '1px solid oklch(0.30 0.01 270)',
                  borderRadius: '8px',
                  color: 'white'
                }}
                formatter={(value: number) => [`${value.toLocaleString()} shares`, 'Volume']}
              />
              <Bar 
                dataKey="volume" 
                fill="oklch(0.65 0.15 162.48)" 
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Combined Line Chart */}
      <div>
        <h4 className="text-lg font-semibold text-primary mb-4">
          Price Trend Line
        </h4>
        <div className="h-48 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={priceData}>
              <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.30 0.01 270)" />
              <XAxis 
                dataKey="month" 
                stroke="oklch(0.65 0 0)" 
                tick={{ fill: 'oklch(0.65 0 0)' }}
              />
              <YAxis 
                stroke="oklch(0.65 0 0)" 
                tick={{ fill: 'oklch(0.65 0 0)' }}
                tickFormatter={(value) => `$${value}`}
              />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'oklch(0.18 0.01 270)', 
                  border: '1px solid oklch(0.30 0.01 270)',
                  borderRadius: '8px',
                  color: 'white'
                }}
                formatter={(value: number) => [`$${value.toFixed(2)}`, 'Price']}
              />
              <Line 
                type="monotone" 
                dataKey="price" 
                stroke="oklch(0.696 0.17 162.48)" 
                strokeWidth={3}
                dot={{ fill: 'oklch(0.696 0.17 162.48)', strokeWidth: 2, r: 5 }}
                activeDot={{ r: 8, fill: 'oklch(0.75 0.18 162.48)' }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
