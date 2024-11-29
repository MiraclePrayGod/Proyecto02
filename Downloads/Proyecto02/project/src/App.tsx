import React, { useState } from 'react';
import { Calculator } from 'lucide-react';
import GaussianPlot from './components/GaussianPlot';
import StratumForm from './components/StratumForm';
import SampleResults from './components/SampleResults';
import { calculateStratifiedSample, StratumData } from './utils/statistics';
import { defaultStrata } from './utils/defaults';

function App() {
  const [strata, setStrata] = useState<Omit<StratumData, 'sampleSize'>[]>(defaultStrata);
  const [confidenceLevel, setConfidenceLevel] = useState(0.95);
  const [marginOfError, setMarginOfError] = useState(0.05);
  const [results, setResults] = useState<StratumData[]>([]);

  const calculateSample = () => {
    const results = calculateStratifiedSample(strata, confidenceLevel, marginOfError);
    setResults(results);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      <header className="bg-white shadow-md border-b border-indigo-100">
        <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
          <div className="flex items-center space-x-3">
            <Calculator className="h-8 w-8 text-indigo-600" />
            <h1 className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              Muestreo Estratificado
            </h1>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid grid-cols-3 gap-8">
          <div className="col-span-2 space-y-8">
            <div className="bg-white p-8 rounded-xl shadow-xl border border-indigo-50">
              <h2 className="text-2xl font-semibold mb-8 text-gray-800">Configuración del Muestreo</h2>
              
              <div className="space-y-8">
                <div className="bg-gradient-to-r from-indigo-50 to-purple-50 p-6 rounded-lg">
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Nivel de Confianza: {(confidenceLevel * 100).toFixed(0)}%
                  </label>
                  <input
                    type="range"
                    min="0.8"
                    max="0.99"
                    step="0.01"
                    value={confidenceLevel}
                    onChange={(e) => setConfidenceLevel(parseFloat(e.target.value))}
                    className="w-full h-2 bg-gradient-to-r from-indigo-300 to-purple-300 rounded-lg appearance-none cursor-pointer"
                  />
                </div>

                <div className="bg-gradient-to-r from-purple-50 to-indigo-50 p-6 rounded-lg">
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Margen de Error: {(marginOfError * 100).toFixed(1)}%
                  </label>
                  <input
                    type="range"
                    min="0.01"
                    max="0.1"
                    step="0.01"
                    value={marginOfError}
                    onChange={(e) => setMarginOfError(parseFloat(e.target.value))}
                    className="w-full h-2 bg-gradient-to-r from-purple-300 to-indigo-300 rounded-lg appearance-none cursor-pointer"
                  />
                </div>

                <StratumForm strata={strata} onStrataChange={setStrata} />

                <button
                  onClick={calculateSample}
                  disabled={strata.length === 0}
                  className="w-full px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white text-lg font-semibold rounded-lg shadow-lg hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 disabled:from-gray-400 disabled:to-gray-500"
                >
                  Calcular Tamaño de Muestra
                </button>
              </div>
            </div>

            {results.length > 0 && <SampleResults strata={results} />}
          </div>

          <div className="col-span-1 space-y-6">
            {results.map((stratum, index) => (
              <GaussianPlot
                key={index}
                name={stratum.name}
                mean={stratum.mean}
                stdDev={stratum.stdDev}
                confidenceLevel={confidenceLevel}
              />
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;