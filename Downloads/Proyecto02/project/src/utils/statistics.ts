import { normal } from 'jstat';

export interface StratumData {
  name: string;
  size: number;
  mean: number;
  stdDev: number;
  sampleSize: number;
}

export const calculateStratifiedSample = (
  strata: Omit<StratumData, 'sampleSize'>[],
  confidenceLevel: number = 0.95,
  marginOfError: number = 0.05
): StratumData[] => {
  const zScore = normal.inv((1 + confidenceLevel) / 2, 0, 1);
  const totalPopulation = strata.reduce((sum, stratum) => sum + stratum.size, 0);

  // Cálculo usando la fórmula de Neyman para muestreo estratificado
  const numerator = Math.pow(zScore, 2) * strata.reduce((sum, stratum) => {
    return sum + (stratum.size * stratum.stdDev);
  }, 0);

  const denominator = Math.pow(marginOfError, 2) * totalPopulation + 
    Math.pow(zScore, 2) * strata.reduce((sum, stratum) => {
      return sum + ((stratum.size * Math.pow(stratum.stdDev, 2)) / totalPopulation);
    }, 0);

  // Cálculo del tamaño de muestra total
  let totalSampleSize = Math.ceil(numerator / denominator);

  // Asegurarse de que el tamaño de muestra no exceda la población total
  totalSampleSize = Math.min(totalSampleSize, totalPopulation);

  // Distribución de la muestra entre estratos usando la asignación de Neyman
  const results = strata.map(stratum => {
    const weight = (stratum.size * stratum.stdDev) / 
      strata.reduce((sum, s) => sum + (s.size * s.stdDev), 0);
    
    let stratumSampleSize = Math.round(totalSampleSize * weight);
    stratumSampleSize = Math.min(stratumSampleSize, stratum.size);
    
    return {
      ...stratum,
      sampleSize: stratumSampleSize
    };
  });

  // Ajuste final para asegurar que la suma de las muestras sea igual al total calculado
  let currentTotal = results.reduce((sum, stratum) => sum + stratum.sampleSize, 0);
  
  // Si hay diferencia, ajustar proporcionalmente
  if (currentTotal !== totalSampleSize) {
    const diff = totalSampleSize - currentTotal;
    const adjustableStrata = results.filter(s => s.sampleSize < s.size);
    
    if (adjustableStrata.length > 0) {
      const largestAdjustable = adjustableStrata.reduce((prev, current) => 
        (current.size - current.sampleSize) > (prev.size - prev.sampleSize) ? current : prev
      );
      
      const index = results.findIndex(s => s.name === largestAdjustable.name);
      const newSize = Math.min(results[index].sampleSize + diff, results[index].size);
      results[index].sampleSize = newSize;
    }
  }

  return results;
};