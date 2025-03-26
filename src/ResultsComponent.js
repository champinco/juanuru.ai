import React from 'react';

function ResultsComponent({ results }) {
  return (
    <div className="results">
      <h3>Results</h3>
      <p>System Size: {results.systemSize} kW</p>
      <p>Total Cost: {results.totalCost} KSh</p>
      <p>Annual Grid Cost: {results.annualGridCost} KSh</p>
      <p>Annual Maintenance: {results.annualMaintenance} KSh</p>
    </div>
  );
}

export default ResultsComponent;