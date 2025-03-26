import React from 'react';

function ComparisonComponent({ scenarios }) {
  return (
    <div className="comparison">
      <h3>Saved Scenarios</h3>
      <table>
        <thead>
          <tr>
            <th>Scenario</th>
            <th>System Size (kW)</th>
            <th>Total Cost (KSh)</th>
            <th>Annual Grid Cost (KSh)</th>
            <th>Annual Savings (KSh)</th>
          </tr>
        </thead>
        <tbody>
          {scenarios.map((scenario, index) => {
            const annualSavings =
              scenario.results.annualGridCost -
              scenario.results.annualMaintenance;
            return (
              <tr key={index}>
                <td>Scenario {index + 1}</td>
                <td>{scenario.results.systemSize}</td>
                <td>{scenario.results.totalCost}</td>
                <td>{scenario.results.annualGridCost}</td>
                <td>{annualSavings.toFixed(0)}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default ComparisonComponent;