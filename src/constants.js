// constants.js

// Grid electricity rate
export const gridRate = 25; // KSh per kWh

// Average peak sun hours per day (based on typical conditions in Kenya)
export const peakSunHours = 5; // hours per day

// List of common appliances with default power (watts) and usage hours per day
export const appliances = [
  { name: 'Fridge', power: 150, hours: 24 },
  { name: 'TV', power: 100, hours: 4 },
  { name: 'Lights', power: 10, hours: 5 },
  { name: 'Fan', power: 50, hours: 3 },
  // Add more appliances as needed
];

// Available system types for solar installations
export const systemTypes = ['Grid-Tied', 'Off-Grid', 'Hybrid'];

// Available battery types for storage options
export const batteryTypes = ['Lead-Acid', 'Lithium-Ion'];

// Panel quality cost range (used for sliders or inputs)
export const panelQualityMin = 20; // KSh/W
export const panelQualityMax = 100; // KSh/W

// Shading percentage range (used for environmental adjustments)
export const shadingMin = 0; // %
export const shadingMax = 100; // %

// Cost per kilowatt for the solar system
export const costPerKW = 100000; // KSh per kW

// Annual maintenance rate as a percentage of initial cost
export const maintenanceRate = 0.02; // 2%

// Estimated daily energy consumption per person for household size method
export const kWhPerPersonPerDay = 2; // kWh

// Battery autonomy range (days of storage capacity)
export const batteryAutonomyMin = 1; // days
export const batteryAutonomyMax = 5; // days