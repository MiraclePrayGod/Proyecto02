import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { StratumData } from '../utils/statistics';

interface SampleResultsProps {
  strata: StratumData[];
}

const COLORS = ['#818CF8', '#A855F7', '#EC4899', '#F472B6', '#FB7185'];

const SampleResults: React.FC<SampleResultsProps> = ({ strata }) => {
  const totalSampleSize = strata.reduce((sum, stratum) => sum + stratum.sampleSize, 0);
  
  const pieData = strata.map(stratum => ({
    name: stratum.name,
    value: stratum.sampleSize,
    percentage: ((stratum.sampleSize / totalSampleSize) * 100).toFixed(1)
  }));

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-4 rounded-lg shadow-lg border border-gray-200">
          <p className="font-semibold">{payload[0].name}</p>
          <p className="text-gray-600">Tamaño: {payload[0].value}</p>
          <p className="text-gray-600">{payload[0].payload.percentage}% del total</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-xl shadow-xl border border-indigo-50">
        <h3 className="text-xl font-semibold mb-4">Resultados del Muestreo</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <p className="text-2xl font-bold text-indigo-600 mb-6">
              Tamaño Total de la Muestra: {totalSampleSize}
            </p>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Estrato
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Tamaño Muestra
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Porcentaje
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {strata.map((stratum, index) => (
                    <tr key={index}>
                      <td className="px-6 py-4 whitespace-nowrap">{stratum.name}</td>
                      <td className="px-6 py-4 whitespace-nowrap">{stratum.sampleSize}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {((stratum.sampleSize / totalSampleSize) * 100).toFixed(1)}%
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  fill="#8884d8"
                  paddingAngle={5}
                  dataKey="value"
                  label={({ name, percentage }) => `${name} (${percentage}%)`}
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SampleResults;