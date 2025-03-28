// ResultsComponent.js
import React from 'react';
import ChartComponent from './ChartComponent';
import { batteryTypes } from './constants';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

function ResultsComponent({ results }) {
  // Generate and download PDF report
  const generatePDF = async () => {
    const reportElement = document.getElementById('report');
    const canvas = await html2canvas(reportElement);
    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF();
    pdf.addImage(imgData, 'PNG', 0, 0, 210, 297); // A4 size in mm
    pdf.save('solar_sizing_report.pdf');
  };

  return (
    <div id="report" className="results">
      <h3>Your Solar System Results</h3>
      <p><strong>System Size:</strong> {results.systemSize} kW</p>
      <p><strong>Total Cost:</strong> {results.totalCost} KSh</p>
      <p><strong>Annual Grid Cost:</strong> {results.annualGridCost} KSh</p>
      <p><strong>Annual Solar Cost (with maintenance):</strong> {results.annualSolarCost} KSh</p>
      <p><strong>Suggested Tilt Angle:</strong> {results.tiltAngle}°</p>
      <p>
        <strong>Shading Percentage:</strong> {results.shadingPercentage}%
        {results.shadingPercentage > 20 && (
          <span style={{ color: 'red' }}> (High shading - consider alternatives)</span>
        )}
      </p>
      <p><strong>Battery Type:</strong> {batteryTypes.find((t) => t.value === results.batteryType).label}</p>
      <ChartComponent annualGridCost={results.annualGridCost} annualSolarCost={results.annualSolarCost} />
      <button onClick={generatePDF}>Download PDF Report</button>
    </div>
  );
}

export default ResultsComponent;