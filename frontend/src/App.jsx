import { useState, useEffect } from "react";

import { useHostChannel } from "./HostChannel";

const API_URL = "https://chub.uat.stg-01.micontenthub.com/api/countries";

const CountryDropdownEditor = () => {
  const [countries, setCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState("");

  useEffect(() => {
    fetch(API_URL)
      .then((response) => response.json())
      .then(({ response: { results } }) => {
        setCountries(
          results.map((country) => {
            return { value: country.code, label: country.name };
          })
        );
      });
  }, []);

  const hostChannel = useHostChannel({
    onMessage(message) {
      switch (message.type) {
        case "connected":
          hostChannel.sendMessage({
            type: "set:style",
            payload: {
              height: "350px",
            },
          });
          hostChannel.sendMessage({
            type: "get:field-value",
          });
          break;

        case "field-value":
          setSelectedCountry(message.data.selectedCountry);
          break;

        default:
          break;
      }
    },
  });

  const handleChange = (event) => {
    const value = event.target.value;
    setSelectedCountry(value);
    hostChannel.sendMessage({
      type: "set:field-value",
      data: { selectedCountry: value },
    });
  };

  return (
    <div>
      <select value={selectedCountry} onChange={handleChange}>
        <option value="">Select a country - View</option>
        {countries.map((country) => (
          <option key={country.label} value={country.label}>
            {country.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default CountryDropdownEditor;
