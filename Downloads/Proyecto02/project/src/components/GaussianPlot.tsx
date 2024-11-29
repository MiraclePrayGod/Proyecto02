import React from 'react';
import { AreaChart, Area, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { normal } from 'jstat';

interface GaussianPlotProps {
  mean: number;
  stdDev: number;
  confidenceLevel: number;
  name: string;
}

const GaussianPlot: React.FC<GaussianPlotProps> = ({ mean, stdDev, confidenceLevel, name }) => {
  const generatePlotData = () => {
    const data = [];
    const range = 4;
    const points = 200; // Increased for smoother curves
    const step = (2 * range * stdDev) / points;
    
    const zScore = normal.inv((1 + confidenceLevel) / 2, 0, 1);
    const lowerBound = mean - zScore * stdDev;
    const upperBound = mean + zScore * stdDev;
    
    for (let x = mean - range * stdDev; x <= mean + range * stdDev; x += step) {
      const y = normal.pdf(x, mean, stdDev);
      data.push({
        x,
        y,
        confidence: x >= lowerBound && x <= upperBound ? y : null,
        area: y
      });
    }
    
    return data;
  };

  const colors = {
    area: 'url(#colorGradient)',
    confidence: '#A855F7',
    line: '#6366F1'
  };

  return (
    <div className="w-full bg-white p-6 rounded-xl shadow-xl border border-indigo-50">
      <h3 className="text-lg font-semibold mb-4 text-gray-800">
        Distribución Normal - {name}
      </h3>
      <div className="h-[250px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={generatePlotData()} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <defs>
              <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#818CF8" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#C4B5FD" stopOpacity={0.1}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
            <XAxis
              dataKey="x"
              label={{ value: 'Valor', position: 'bottom', fill: '#4B5563' }}
              tick={{ fill: '#4B5563' }}
            />
            <YAxis
              label={{ value: 'Densidad', angle: -90, position: 'insideLeft', fill: '#4B5563' }}
              tick={{ fill: '#4B5563' }}
            />
            <Tooltip
              formatter={(value: number) => value?.toFixed(4)}
              labelFormatter={(value: number) => `x = ${value.toFixed(2)}`}
              contentStyle={{ backgroundColor: '#F9FAFB', border: '1px solid #E5E7EB' }}
            />
            <Legend wrapperStyle={{ paddingTop: '10px' }} />
            <Area
              type="monotone"
              dataKey="area"
              stroke={colors.line}
              fill={colors.area}
              name="Distribución"
            />
            <Line
              type="monotone"
              dataKey="confidence"
              stroke={colors.confidence}
              strokeWidth={2}
              name={`IC (${(confidenceLevel * 100).toFixed(0)}%)`}
              dot={false}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default GaussianPlot;