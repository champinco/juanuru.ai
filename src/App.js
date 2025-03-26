import React, { useState, useMemo, useRef } from 'react';
import FormComponent from './FormComponent';
import ResultsComponent from './ResultsComponent';
import ComparisonComponent from './ComparisonComponent';
import ChartComponent from './ChartComponent';
import PdfReportComponent from './PdfReportComponent';
import { gridRate } from './constants';
import './App.css';

function App() {
  // Existing state variables
  const [consumptionMethod, setConsumptionMethod] = useState('bill');
  const [billAmount, setBillAmount] = useState('');
  const [roofSize, setRoofSize] = useState('');
  const [results, setResults] = useState(null);
  const [scenarios, setScenarios] = useState([]);
  const chartRef = useRef(null);

  // New state variables for additional fields
  const [location, setLocation] = useState('');
  const [householdSize, setHouseholdSize] = useState('');
  const [selectedAppliances, setSelectedAppliances] = useState([]);
  const [shadingPercentage, setShadingPercentage] = useState(0);
  const [systemType, setSystemType] = useState('Grid-Tied');
  const [batteryAutonomy, setBatteryAutonomy] = useState(1);
  const [batteryType, setBatteryType] = useState('Lead-Acid');
  const [panelQuality, setPanelQuality] = useState(50); // Default 50 KSh/W

  // Real-time calculation using useMemo
  const calculateResults = useMemo(() => {
    if (!roofSize) return null;

    let daily_kWh = 0;

    // Calculate daily energy consumption based on method
    if (consumptionMethod === 'bill' && billAmount) {
      daily_kWh = billAmount / gridRate / 30; // Assuming monthly bill in KSh
    } else if (consumptionMethod === 'household' && householdSize) {
      daily_kWh = householdSize * 2; // Example: 2 kWh/day per person
    } else if (consumptionMethod === 'appliances' && selectedAppliances.length > 0) {
      daily_kWh = selectedAppliances.reduce((total, appliance) => {
        return total + (appliance.power * appliance.hours) / 1000; // kWh
      }, 0);
    } else {
      return null; // Incomplete inputs
    }

    // Adjust for shading (reduce effective roof size)
    const adjustedRoofSize = roofSize * (1 - shadingPercentage / 100);

    // Calculate system size (kW) based on daily kWh and panel quality
    const systemSize_kW = daily_kWh / (5 * (panelQuality / 50)); // 5 peak sun hours, scaled by quality

    // Calculate battery size if not grid-tied
    const batterySize = systemType !== 'Grid-Tied' ? daily_kWh * batteryAutonomy : 0;

    // Calculate costs
    const totalCost = systemSize_kW * 100000; // Example: 100,000 KSh/kW
    const annualGridCost = daily_kWh * 365 * gridRate;
    const annualMaintenance = totalCost * 0.02; // 2% of initial cost

    return {
      systemSize: systemSize_kW.toFixed(2),
      batterySize: batterySize.toFixed(2),
      totalCost: totalCost.toFixed(0),
      annualGridCost: annualGridCost.toFixed(0),
      annualMaintenance: annualMaintenance.toFixed(0),
      roofSize: parseFloat(roofSize),
    };
  }, [
    consumptionMethod,
    billAmount,
    householdSize,
    selectedAppliances,
    roofSize,
    shadingPercentage,
    systemType,
    batteryAutonomy,
    panelQuality,
  ]);

  const handleCalculate = () => {
    setResults(calculateResults);
  };

  const saveScenario = () => {
    if (results) {
      setScenarios((prev) => [
        ...prev,
        {
          inputs: {
            consumptionMethod,
            billAmount,
            householdSize,
            selectedAppliances,
            roofSize,
            shadingPercentage,
            systemType,
            batteryAutonomy,
            batteryType,
            panelQuality,
          },
          results,
        },
      ]);
    }
  };

  return (
    <div className="app">
      <h1>Solar Sizing App</h1>
      <FormComponent
        // Existing props
        consumptionMethod={consumptionMethod}
        setConsumptionMethod={setConsumptionMethod}
        billAmount={billAmount}
        setBillAmount={setBillAmount}
        roofSize={roofSize}
        setRoofSize={setRoofSize}
        handleCalculate={handleCalculate}
        // New props
        location={location}
        setLocation={setLocation}
        householdSize={householdSize}
        setHouseholdSize={setHouseholdSize}
        selectedAppliances={selectedAppliances}
        setSelectedAppliances={setSelectedAppliances}
        shadingPercentage={shadingPercentage}
        setShadingPercentage={setShadingPercentage}
        systemType={systemType}
        setSystemType={setSystemType}
        batteryAutonomy={batteryAutonomy}
        setBatteryAutonomy={setBatteryAutonomy}
        batteryType={batteryType}
        setBatteryType={setBatteryType}
        panelQuality={panelQuality}
        setPanelQuality={setPanelQuality}
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