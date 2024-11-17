import { useState, useEffect } from "react";

import { useRemoteFieldHost } from "./RemoteFieldHost";


const CountryDropdownEditor = () => {
  const [countries, setCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState("");

  useEffect(() => {
    fetch('/api/countries')
      .then((response) => response.json())
      .then(({ response: { results } }) => {
        setCountries(results);
      });
  }, []);

  const remoteFieldHost = useRemoteFieldHost({
    onMessage(message) {
      switch (message.type) {
        case "connected":
          remoteFieldHost.sendMessage({
            type: "set:style",
            payload: {
              height: "350px",
            },
          });
          remoteFieldHost.sendMessage({
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
    remoteFieldHost.sendMessage({
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
