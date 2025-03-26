import React from 'react';

function FormComponent({
  consumptionMethod,
  setConsumptionMethod,
  billAmount,
  setBillAmount,
  roofSize,
  setRoofSize,
  handleCalculate,
}) {
  return (
    <div className="form">
      <h2>Enter Your Details</h2>
      <label>
        Consumption Method:
        <select
          value={consumptionMethod}
          onChange={(e) => setConsumptionMethod(e.target.value)}
        >
          <option value="bill">Monthly Bill</option>
          <option value="household">Household Size</option>
        </select>
      </label>
      <label>
        Monthly Bill (KSh):
        <input
          type="number"
          value={billAmount}
          onChange={(e) => setBillAmount(e.target.value)}
        />
      </label>
      <label>
        Roof Size (sqm):
        <input
          type="number"
          value={roofSize}
          onChange={(e) => setRoofSize(e.target.value)}
        />
      </label>
      <button onClick={handleCalculate}>Calculate</button>
    </div>
  );
}

export default FormComponent;