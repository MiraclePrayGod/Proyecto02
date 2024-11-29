import React from 'react';
import { Plus, Trash2 } from 'lucide-react';

interface Stratum {
  name: string;
  size: number;
  mean: number;
  stdDev: number;
}

interface StratumFormProps {
  strata: Stratum[];
  onStrataChange: (strata: Stratum[]) => void;
}

const StratumForm: React.FC<StratumFormProps> = ({ strata, onStrataChange }) => {
  const addStratum = () => {
    onStrataChange([...strata, { name: '', size: 0, mean: 0, stdDev: 0 }]);
  };

  const removeStratum = (index: number) => {
    onStrataChange(strata.filter((_, i) => i !== index));
  };

  const updateStratum = (index: number, field: keyof Stratum, value: string | number) => {
    const newStrata = [...strata];
    newStrata[index] = { ...newStrata[index], [field]: value };
    onStrataChange(newStrata);
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-semibold text-gray-800">Datos de los Estratos</h3>
        <button
          onClick={addStratum}
          className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 shadow-md"
        >
          <Plus className="h-4 w-4" />
          <span>Agregar Estrato</span>
        </button>
      </div>

      <div className="space-y-4">
        {strata.map((stratum, index) => (
          <div
            key={index}
            className="grid grid-cols-5 gap-4 items-center bg-gradient-to-r from-indigo-50 to-purple-50 p-6 rounded-lg border border-indigo-100 shadow-sm"
          >
            <input
              type="text"
              placeholder="Nombre del estrato"
              value={stratum.name}
              onChange={(e) => updateStratum(index, 'name', e.target.value)}
              className="col-span-1 px-4 py-2 border border-indigo-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
            />
            <input
              type="number"
              placeholder="Tamaño"
              value={stratum.size || ''}
              onChange={(e) => updateStratum(index, 'size', parseInt(e.target.value) || 0)}
              className="col-span-1 px-4 py-2 border border-indigo-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
            />
            <input
              type="number"
              placeholder="Media"
              value={stratum.mean || ''}
              onChange={(e) => updateStratum(index, 'mean', parseFloat(e.target.value) || 0)}
              className="col-span-1 px-4 py-2 border border-indigo-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
            />
            <input
              type="number"
              placeholder="Desviación Estándar"
              value={stratum.stdDev || ''}
              onChange={(e) => updateStratum(index, 'stdDev', parseFloat(e.target.value) || 0)}
              className="col-span-1 px-4 py-2 border border-indigo-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
            />
            <button
              onClick={() => removeStratum(index)}
              className="flex items-center justify-center p-2 text-red-600 hover:text-red-800 hover:bg-red-50 rounded-lg transition-all duration-200"
            >
              <Trash2 className="h-5 w-5" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StratumForm;