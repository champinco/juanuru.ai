import React, { useState, useMemo, useRef } from 'react';
import FormComponent from './FormComponent';
import ResultsComponent from './ResultsComponent';
import ComparisonComponent from './ComparisonComponent';
import ChartComponent from './ChartComponent';
import PdfReportComponent from './PdfReportComponent';
import { gridRate } from './constants';
import './App.css';

function App() {
  // State for form inputs
  const [consumptionMethod, setConsumptionMethod] = useState('bill');
  const [billAmount, setBillAmount] = useState('');
  const [roofSize, setRoofSize] = useState('');
  const [results, setResults] = useState(null);
  const [scenarios, setScenarios] = useState([]);
  const chartRef = useRef(null);

  // Real-time calculation using useMemo
  const calculateResults = useMemo(() => {
    if (!billAmount || !roofSize) return null;

    let daily_kWh;
    if (consumptionMethod === 'bill') {
      daily_kWh = billAmount / gridRate / 30; // Assuming monthly bill in KSh
    } else {
      daily_kWh = 10; // Placeholder for other methods
    }

    const systemSize_kW = daily_kWh / 5; // 5 peak sun hours
    const totalCost = systemSize_kW * 100000; // 100,000 KSh/kW
    const annualGridCost = daily_kWh * 365 * gridRate;
    const annualMaintenance = totalCost * 0.02; // 2% of initial cost

    return {
      systemSize: systemSize_kW.toFixed(2),
      totalCost: totalCost.toFixed(0),
      annualGridCost: annualGridCost.toFixed(0),
      annualMaintenance: annualMaintenance.toFixed(0),
      roofSize: parseFloat(roofSize),
    };
  }, [consumptionMethod, billAmount, roofSize]);

  const handleCalculate = () => {
    setResults(calculateResults);
  };

  const saveScenario = () => {
    if (results) {
      setScenarios((prev) => [
        ...prev,
        {
          inputs: { consumptionMethod, billAmount, roofSize },
          results,
        },
      ]);
    }
  };

  return (
    <div className="app">
      <h1>Solar Sizing App</h1>
      <FormComponent
        consumptionMethod={consumptionMethod}
        setConsumptionMethod={setConsumptionMethod}
        billAmount={billAmount}
        setBillAmount={setBillAmount}
        roofSize={roofSize}
        setRoofSize={setRoofSize}
        handleCalculate={handleCalculate}
      />
      {results && (
        <div>
          <ResultsComponent results={results} />
          <ChartComponent
            annualGridCost={results.annualGridCost}
            initialSolarCost={results.totalCost}
            annualMaintenance={results.annualMaintenance}
            ref={chartRef}
          />
          <button onClick={saveScenario}>Save Scenario</button>
          <PdfReportComponent results={results} chartRef={chartRef} />
        </div>
      )}
      {scenarios.length > 0 && <ComparisonComponent scenarios={scenarios} />}
    </div>
  );
}

export default App;