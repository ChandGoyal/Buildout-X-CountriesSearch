import React, { useState, useEffect } from "react";

function App() {
  const [countries, setCountries] = useState([]);
  const [filteredCountries, setFilteredCountries] = useState([]);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetch("https://restcountries.com/v3.1/all")
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to fetch data");
        }
        return res.json();
      })
      .then((data) => {
        setCountries(data);
        setFilteredCountries(data);
      })
      .catch((err) => {
        console.error("Error fetching data: ", err);
        setError(err.message);
      });
  }, []);

  const handleSearch = (e) => {
    const searchTerm = e.target.value.toLowerCase();
    setSearchTerm(searchTerm);
    const filtered = countries.filter((country) =>
      country.name.common.toLowerCase().includes(searchTerm)
    );
    setFilteredCountries(filtered);
  };

  const cardStyle = {
    width: "200px",
    border: "1px solid #ccc",
    borderRadius: "10px",
    margin: "10px",
    padding: "10px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  };

  const imageStyle = {
    width: "100px",
    height: "100px",
  };

  const containerStyle = {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
  };

  const searchContainerStyle = {
    width: "100%",
    display: "flex",
    justifyContent: "center",
    margin: "20px 0",
  };

  const searchBoxStyle = {
    width: "60%",
    height: "30px",
    borderRadius: "5px",
    padding: "5px",
    fontSize: "18px",
    outline: "none",
    marginTop: "16px",
  };

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <>
      <div style={searchContainerStyle}>
        <input
          type="text"
          placeholder="Search for countries..."
          value={searchTerm}
          onChange={handleSearch}
          style={searchBoxStyle}
        />
      </div>
      <div style={containerStyle}>
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {filteredCountries.length === 0 ? (
            <></>
          ) : (
            filteredCountries.map((country) => (
              <div key={country.cca3} style={cardStyle}>
                <img
                  src={country.flags.png}
                  alt={`Flag of ${country.name.common}`}
                  style={imageStyle}
                />
                <h2>{country.name.common}</h2>
              </div>
            ))
          )}
        </div>
      </div>
    </>
  );
}

export default App;
