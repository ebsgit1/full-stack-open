import Information from "./Information";
import Weather from "./Weather";

const AllCountries = ({ countries, filter, filterCountry }) => {
  const countriesToShow = countries.filter((country) =>
    country.name.common.toLowerCase().includes(filter.toLowerCase())
  );

  if (countriesToShow.length > 10) {
    return (
      <div>
        <p>Too many matches, specify another filter</p>
      </div>
    );
  }
  if (countriesToShow.length === 1) {
    return (
      <div>
        {countriesToShow.map((country) => (
          <div key={country.name.common}>
            <Information country={country} />
            <Weather country={country} />
          </div>
        ))}
      </div>
    );
  } else {
    return (
      <div>
        {countriesToShow.map((country) => (
          <div key={country.name.common}>
            {country.name.common}{" "}
            <button onClick={() => filterCountry(country.name.common)}>
              Show
            </button>
          </div>
        ))}
      </div>
    );
  }
};

export default AllCountries;
