import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { StratumData } from '../utils/statistics';

interface StratifiedSamplingResultsProps {
  strata: StratumData[];
}

const StratifiedSamplingResults: React.FC<StratifiedSamplingResultsProps> = ({ strata }) => {
  const barData = strata.map(stratum => ({
    name: stratum.name,
    'Population Size': stratum.size,
    'Sample Size': stratum.sampleSize,
    'Mean': stratum.mean,
    'Standard Deviation': stratum.stdDev
  }));

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h3 className="text-lg font-semibold mb-4">Stratum Statistics</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Stratum</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Size</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Sample Size</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Mean</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Std Dev</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {strata.map((stratum, index) => (
                <tr key={index}>
                  <td className="px-6 py-4 whitespace-nowrap">{stratum.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{stratum.size}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{stratum.sampleSize}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{stratum.mean.toFixed(2)}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{stratum.stdDev.toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h3 className="text-lg font-semibold mb-4">Stratum Comparison</h3>
        <div className="h-[400px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={barData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="Population Size" fill="#8884d8" />
              <Bar dataKey="Sample Size" fill="#82ca9d" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default StratifiedSamplingResults;