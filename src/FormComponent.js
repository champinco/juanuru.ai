// FormComponent.js
import React, { useState } from 'react';
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-places-autocomplete';
import { applianceCategories, batteryTypes } from './constants';
import { Tooltip } from 'react-tooltip'; // Updated import to named export

function FormComponent({
  preciseLocation,
  setPreciseLocation,
  consumptionMethod,
  setConsumptionMethod,
  billAmount,
  setBillAmount,
  householdSize,
  setHouseholdSize,
  selectedAppliances,
  setSelectedAppliances,
  roofSize,
  setRoofSize,
  shadingPercentage,
  setShadingPercentage,
  systemType,
  setSystemType,
  batteryType,
  setBatteryType,
}) {
  const [address, setAddress] = useState(preciseLocation.address);

  // Handle address selection and geocode to lat/lng
  const handleSelect = async (selected) => {
    const results = await geocodeByAddress(selected);
    const latLng = await getLatLng(results[0]);
    setPreciseLocation({ address: selected, lat: latLng.lat, lng: latLng.lng });
    setAddress(selected);
  };

  return (
    <div className="form">
      <h2>Enter Your Details</h2>

      {/* Precise Location Input */}
      <label>
        Location:
        <PlacesAutocomplete value={address} onChange={setAddress} onSelect={handleSelect}>
          {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
            <div>
              <input {...getInputProps({ placeholder: 'Enter your address' })} />
              <div className="suggestions">
                {loading && <div>Loading...</div>}
                {suggestions.map((suggestion) => (
                  <div {...getSuggestionItemProps(suggestion)} key={suggestion.placeId}>
                    {suggestion.description}
                  </div>
                ))}
              </div>
            </div>
          )}
        </PlacesAutocomplete>
        <span data-tooltip-id="info-tooltip" data-tooltip-content="Enter your exact address for accurate solar data">ℹ️</span>
      </label>

      {/* Roof Size */}
      <label>
        Roof Size (sqm):
        <input
          type="number"
          value={roofSize}
          onChange={(e) => setRoofSize(e.target.value)}
          min="0"
        />
        <span data-tooltip-id="info-tooltip" data-tooltip-content="Area available for solar panels">ℹ️</span>
      </label>

      {/* Shading Percentage */}
      <label>
        Shading Percentage:
        <input
          type="number"
          min="0"
          max="100"
          value={shadingPercentage}
          onChange={(e) => setShadingPercentage(e.target.value)}
        />
        {shadingPercentage > 20 && (
          <p style={{ color: 'red' }}>
            Shading above 20% may reduce efficiency. Consider trimming trees or ground mounting.
          </p>
        )}
        <span data-tooltip-id="info-tooltip" data-tooltip-content="Percentage of roof shaded during peak sun hours">ℹ️</span>
      </label>

      {/* Consumption Method */}
      <label>
        Consumption Method:
        <select value={consumptionMethod} onChange={(e) => setConsumptionMethod(e.target.value)}>
          <option value="bill">Monthly Bill</option>
          <option value="household">Household Size</option>
          <option value="appliances">Appliances</option>
        </select>
        <span data-tooltip-id="info-tooltip" data-tooltip-content="How to estimate your energy use">ℹ️</span>
      </label>

      {consumptionMethod === 'bill' && (
        <label>
          Monthly Bill (KSh):
          <input type="number" value={billAmount} onChange={(e) => setBillAmount(e.target.value)} min="0" />
        </label>
      )}
      {consumptionMethod === 'household' && (
        <label>
          Household Size (people):
          <input type="number" value={householdSize} onChange={(e) => setHouseholdSize(e.target.value)} min="0" />
        </label>
      )}

      {/* Appliance List with Counts */}
      {consumptionMethod === 'appliances' && (
        <div>
          <h3>Select Appliances</h3>
          {applianceCategories.map((cat) => (
            <div key={cat.category}>
              <h4>{cat.category}</h4>
              {cat.appliances.map((appliance) => (
                <div key={appliance.name}>
                  <label>
                    <input
                      type="checkbox"
                      checked={selectedAppliances.some((a) => a.name === appliance.name)}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setSelectedAppliances([
                            ...selectedAppliances,
                            { ...appliance, quantity: 1, hours: appliance.defaultHours },
                          ]);
                        } else {
                          setSelectedAppliances(selectedAppliances.filter((a) => a.name !== appliance.name));
                        }
                      }}
                    />
                    {appliance.name} ({appliance.power} W)
                  </label>
                  {selectedAppliances.some((a) => a.name === appliance.name) && (
                    <div>
                      <label>
                        Quantity:
                        <input
                          type="number"
                          min="1"
                          value={selectedAppliances.find((a) => a.name === appliance.name).quantity}
                          onChange={(e) => {
                            const qty = parseInt(e.target.value) || 1;
                            setSelectedAppliances(selectedAppliances.map((a) =>
                              a.name === appliance.name ? { ...a, quantity: qty } : a
                            ));
                          }}
                        />
                      </label>
                      <label>
                        Hours per Day:
                        <input
                          type="number"
                          min="0"
                          step="0.1"
                          value={selectedAppliances.find((a) => a.name === appliance.name).hours}
                          onChange={(e) => {
                            const hours = parseFloat(e.target.value) || appliance.defaultHours;
                            setSelectedAppliances(selectedAppliances.map((a) =>
                              a.name === appliance.name ? { ...a, hours } : a
                            ));
                          }}
                        />
                      </label>
                    </div>
                  )}
                </div>
              ))}
            </div>
          ))}
        </div>
      )}

      {/* System Type */}
      <label>
        System Type:
        <select value={systemType} onChange={(e) => setSystemType(e.target.value)}>
          <option value="grid-tied">Grid-Tied</option>
          <option value="off-grid">Off-Grid</option>
          <option value="hybrid">Hybrid</option>
        </select>
        <span data-tooltip-id="info-tooltip" data-tooltip-content="Type of solar system">ℹ️</span>
      </label>

      {/* Battery Type */}
      <label>
        Battery Type:
        <select value={batteryType} onChange={(e) => setBatteryType(e.target.value)}>
          {batteryTypes.map((type) => (
            <option key={type.value} value={type.value}>{type.label}</option>
          ))}
        </select>
        <p>{batteryTypes.find((t) => t.value === batteryType).description}</p>
        <span data-tooltip-id="info-tooltip" data-tooltip-content="Choose a battery type based on your needs">ℹ️</span>
      </label>

      {/* Single Tooltip component for all tooltips */}
      <Tooltip id="info-tooltip" />
    </div>
  );
}

export default FormComponent;