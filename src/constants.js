// constants.js
export const gridRate = 25; // KSh per kWh, typical rate in Kenya

// Categorized appliance list with power (watts) and default daily usage hours
export const applianceCategories = [
  {
    category: 'Lighting',
    appliances: [
      { name: 'LED Bulb', power: 10, defaultHours: 5 },
      { name: 'Fluorescent Tube', power: 40, defaultHours: 5 },
    ],
  },
  {
    category: 'Kitchen',
    appliances: [
      { name: 'Refrigerator', power: 150, defaultHours: 24 },
      { name: 'Microwave', power: 1000, defaultHours: 0.5 },
      { name: 'Electric Oven', power: 2400, defaultHours: 1 },
    ],
  },
  {
    category: 'Entertainment',
    appliances: [
      { name: 'TV', power: 100, defaultHours: 4 },
      { name: 'Sound System', power: 200, defaultHours: 2 },
    ],
  },
  {
    category: 'Office',
    appliances: [
      { name: 'Computer', power: 200, defaultHours: 8 },
      { name: 'Printer', power: 500, defaultHours: 1 },
    ],
  },
  {
    category: 'Industrial',
    appliances: [
      { name: 'Industrial Motor', power: 10000, defaultHours: 8 },
      { name: 'Air Conditioner', power: 1500, defaultHours: 8 },
    ],
  },
];

// Battery types with descriptions for user understanding
export const batteryTypes = [
  { value: 'lead-acid', label: 'Lead-Acid', description: 'Affordable, shorter lifespan, lower efficiency.' },
  { value: 'lithium-ion', label: 'Lithium-Ion', description: 'Longer lifespan, higher efficiency, higher cost.' },
];

export const costPerKW = 100000; // KSh per kW, approximate solar system cost
export const systemLifespan = 20; // Years, typical solar system lifespan