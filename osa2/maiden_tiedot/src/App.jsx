import { useState, useEffect } from "react";
import CountriesService from "./services/CountriesService";
import AllCountries from "./components/AllCountries";
import Filter from "./components/Filter";

const App = () => {
  const [countries, setCountries] = useState([]);
  const [filter, setFilter] = useState("");

  useEffect(() => {
    CountriesService.getAll()
      .then((allCountries) => {
        console.log("Fetched countries:", allCountries); // Tarkista ladattu data
        setCountries(allCountries);
      })
      .catch((error) => {
        console.error("Error fetching countries:", error);
        setCountries([]);
      });
  }, []);

  const filterCountry = (country) => {
    setFilter(country);
  };

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  return (
    <div>
      <Filter filter={filter} handleFilterChange={handleFilterChange} />

      <AllCountries
        key={countries.name}
        countries={countries}
        filter={filter}
        filterCountry={filterCountry}
      />
    </div>
  );
};

export default App;
