// App.js
import React, { useState, useMemo, useEffect } from 'react';
import FormComponent from './FormComponent';
import ResultsComponent from './ResultsComponent';
import { gridRate, costPerKW, systemLifespan } from './constants';
import './App.css'; // Optional: for styling

function App() {
  // State variables for all user inputs
  const [preciseLocation, setPreciseLocation] = useState({ address: '', lat: null, lng: null });
  const [consumptionMethod, setConsumptionMethod] = useState('bill');
  const [billAmount, setBillAmount] = useState('');
  const [householdSize, setHouseholdSize] = useState('');
  const [selectedAppliances, setSelectedAppliances] = useState([]);
  const [roofSize, setRoofSize] = useState('');
  const [shadingPercentage, setShadingPercentage] = useState(0);
  const [systemType, setSystemType] = useState('grid-tied');
  const [batteryType, setBatteryType] = useState('lead-acid');
  const [results, setResults] = useState(null);

  // Function to calculate optimal tilt angle based on latitude
  const calculateTiltAngle = (lat) => {
    if (lat >= -25 && lat <= 25) { // Near equator, like Kenya
      return Math.abs(lat).toFixed(1); // Tilt equals latitude
    }
    return 0; // Placeholder for other regions
  };

  // Memoized calculation for efficiency and real-time updates
  const calculateResults = useMemo(() => {
    if (!preciseLocation.lat || !roofSize) return null;

    const peakSunHours = 5.5; // Average for East Africa, could be API-driven
    let daily_kWh = 0;

    // Calculate daily energy consumption based on method
    if (consumptionMethod === 'bill' && billAmount) {
      daily_kWh = billAmount / gridRate / 30; // Bill to kWh/day
    } else if (consumptionMethod === 'household' && householdSize) {
      daily_kWh = householdSize * 2; // 2 kWh/day per person estimate
    } else if (consumptionMethod === 'appliances' && selectedAppliances.length > 0) {
      daily_kWh = selectedAppliances.reduce((total, appliance) => {
        return total + (appliance.power * appliance.quantity * appliance.hours) / 1000;
      }, 0);
    } else {
      return null;
    }

    // Adjust for shading
    const effectivePeakSunHours = peakSunHours * (1 - shadingPercentage / 100);
    const systemSize_kW = daily_kWh / effectivePeakSunHours;
    const totalCost = systemSize_kW * costPerKW;
    const annualGridCost = daily_kWh * 365 * gridRate;
    const annualMaintenance = totalCost * 0.02; // 2% maintenance cost
    const annualSolarCost = (totalCost / systemLifespan) + annualMaintenance; // Annualized cost
    const tiltAngle = calculateTiltAngle(preciseLocation.lat);

    return {
      systemSize: systemSize_kW.toFixed(2),
      totalCost: totalCost.toFixed(0),
      annualGridCost: annualGridCost.toFixed(0),
      annualSolarCost: annualSolarCost.toFixed(0),
      tiltAngle,
      shadingPercentage,
      batteryType,
      roofSize: parseFloat(roofSize),
    };
  }, [preciseLocation, consumptionMethod, billAmount, householdSize, selectedAppliances, roofSize, shadingPercentage]);

  // Update results in real-time
  useEffect(() => {
    setResults(calculateResults);
  }, [calculateResults]);

  return (
    <div className="app">
      <h1>Solar Sizing App</h1>
      <FormComponent
        preciseLocation={preciseLocation}
        setPreciseLocation={setPreciseLocation}
        consumptionMethod={consumptionMethod}
        setConsumptionMethod={setConsumptionMethod}
        billAmount={billAmount}
        setBillAmount={setBillAmount}
        householdSize={householdSize}
        setHouseholdSize={setHouseholdSize}
        selectedAppliances={selectedAppliances}
        setSelectedAppliances={setSelectedAppliances}
        roofSize={roofSize}
        setRoofSize={setRoofSize}
        shadingPercentage={shadingPercentage}
        setShadingPercentage={setShadingPercentage}
        systemType={systemType}
        setSystemType={setSystemType}
        batteryType={batteryType}
        setBatteryType={setBatteryType}
      />
      {results && <ResultsComponent results={results} />}
    </div>
  );
}

export default App;