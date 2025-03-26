import React from 'react';
import jsPDF from 'jspdf';

function PdfReportComponent({ results, chartRef }) {
  const generatePDF = () => {
    const doc = new jsPDF();
    doc.text('Solar Sizing Report', 10, 10);
    doc.text(`System Size: ${results.systemSize} kW`, 10, 20);
    doc.text(`Total Cost: ${results.totalCost} KSh`, 10, 30);
    doc.text(`Annual Grid Cost: ${results.annualGridCost} KSh`, 10, 40);
    doc.text(`Annual Maintenance: ${results.annualMaintenance} KSh`, 10, 50);

    const chartCanvas = chartRef.current.canvas;
    const chartDataURL = chartCanvas.toDataURL('image/png');
    doc.addImage(chartDataURL, 'PNG', 10, 60, 180, 100);

    doc.save('solar_report.pdf');
  };

  return (
    <div className="pdf-button">
      <button onClick={generatePDF}>Download PDF Report</button>
    </div>
  );
}

export default PdfReportComponent;