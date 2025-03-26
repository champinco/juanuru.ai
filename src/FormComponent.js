import React from 'react';

function FormComponent({
  consumptionMethod,
  setConsumptionMethod,
  billAmount,
  setBillAmount,
  roofSize,
  setRoofSize,
  handleCalculate,
  location,
  setLocation,
  householdSize,
  setHouseholdSize,
  selectedAppliances,
  setSelectedAppliances,
  shadingPercentage,
  setShadingPercentage,
  systemType,
  setSystemType,
  batteryAutonomy,
  setBatteryAutonomy,
  batteryType,
  setBatteryType,
  panelQuality,
  setPanelQuality,
}) {
  // Define default appliance data (could be moved to a constants file later)
  const applianceDefaults = {
    Fridge: { power: 150, hours: 24 },
    TV: { power: 100, hours: 4 },
    Lights: { power: 10, hours: 5 },
    Fan: { power: 50, hours: 3 },
  };

  const appliances = Object.keys(applianceDefaults);

  return (
    <div className="form">
      <h2>Enter Your Details</h2>

      {/* Location Input */}
      <label>
        Location:
        <input
          type="text"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          placeholder="Enter your location"
        />
      </label>

      {/* Consumption Method Selection */}
      <label>
        Choose Energy Consumption Estimation Method:
        <select
          value={consumptionMethod}
          onChange={(e) => setConsumptionMethod(e.target.value)}
        >
          <option value="bill">Monthly Bill</option>
          <option value="household">Household Size</option>
          <option value="appliances">Appliances</option>
        </select>
      </label>

      {/* Conditional Inputs Based on Consumption Method */}
      {consumptionMethod === 'bill' && (
        <label>
          Monthly Bill (KSh):
          <input
            type="number"
            value={billAmount}
            onChange={(e) => setBillAmount(e.target.value)}
            min="0"
          />
        </label>
      )}

      {consumptionMethod === 'household' && (
        <label>
          Household Size (number of people):
          <input
            type="number"
            value={householdSize}
            onChange={(e) => setHouseholdSize(e.target.value)}
            min="1"
          />
        </label>
      )}

      {consumptionMethod === 'appliances' && (
        <div>
          <label>Appliances:</label>
          {appliances.map((appliance) => (
            <label key={appliance} style={{ display: 'block' }}>
              <input
                type="checkbox"
                checked={selectedAppliances.some((a) => a.name === appliance)}
                onChange={(e) => {
                  const checked = e.target.checked;
                  if (checked) {
                    setSelectedAppliances([
                      ...selectedAppliances,
                      { name: appliance, ...applianceDefaults[appliance] },
                    ]);
                  } else {
                    setSelectedAppliances(
                      selectedAppliances.filter((a) => a.name !== appliance)
                    );
                  }
                }}
              />
              {appliance}
            </label>
          ))}
        </div>
      )}

      {/* Note for Users Without a Bill */}
      <p>No bill? Use Household Size or Appliances instead.</p>

      {/* Roof Size Input */}
      <label>
        Roof Size (sqm):
        <input
          type="number"
          value={roofSize}
          onChange={(e) => setRoofSize(e.target.value)}
          min="0"
        />
      </label>

      {/* Shading Percentage Slider */}
      <label>
        Shading Percentage (%):
        <input
          type="range"
          min="0"
          max="100"
          value={shadingPercentage}
          onChange={(e) => setShadingPercentage(e.target.value)}
        />
        <span>{shadingPercentage}%</span>
      </label>

      {/* System Type Selection */}
      <label>
        System Type:
        <select
          value={systemType}
          onChange={(e) => setSystemType(e.target.value)}
        >
          <option value="Grid-Tied">Grid-Tied</option>
          <option value="Off-Grid">Off-Grid</option>
          <option value="Hybrid">Hybrid</option>
        </select>
      </label>

      {/* Battery Fields (Shown for Off-Grid or Hybrid Systems) */}
      {(systemType === 'Off-Grid' || systemType === 'Hybrid') && (
        <>
          <label>
            Battery Autonomy (days):
            <input
              type="number"
              min="1"
              max="5"
              value={batteryAutonomy}
              onChange={(e) => setBatteryAutonomy(e.target.value)}
            />
          </label>
          <label>
            Battery Type:
            <select
              value={batteryType}
              onChange={(e) => setBatteryType(e.target.value)}
            >
              <option value="Lead-Acid">Lead-Acid</option>
              <option value="Lithium-Ion">Lithium-Ion</option>
            </select>
          </label>
        </>
      )}

      {/* Panel Quality Slider */}
      <label>
        Panel Quality (KSh/W):
        <input
          type="range"
          min="20"
          max="100"
          value={panelQuality}
          onChange={(e) => setPanelQuality(e.target.value)}
        />
        <span>{panelQuality} KSh/W</span>
      </label>

      {/* Calculate Button */}
      <button onClick={handleCalculate}>Calculate</button>
    </div>
  );
}

export default FormComponent;