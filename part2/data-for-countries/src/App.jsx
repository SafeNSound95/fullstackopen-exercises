import { useEffect, useState } from "react";
import axios from "axios";

const App = () => {
  const [allCountriesNames, setAllCountriesNames] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [countriesToShow, setCountriesToShow] = useState(null);
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    axios
      .get("https://studies.cs.helsinki.fi/restcountries/api/all")
      .then((response) =>
        setAllCountriesNames(
          response.data.map((country) => country.name.common)
        )
      );
  }, []);

  const showWeather = (country) => {
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?lat=${
          country.latlng[0]
        }&lon=${country.latlng[1]}&appid=${
          import.meta.env.VITE_API_KEY
        }&units=metric`
      )
      .then((response) => {
        setWeather(response.data);
      });
  };

  const showCountry = (country) => {
    axios
      .get(`https://studies.cs.helsinki.fi/restcountries/api/name/${country}`)
      .then((response) => {
        showWeather(response.data);
        setCountriesToShow(
          <>
            <h1>{response.data.name.common}</h1>
            <div>Capital {response.data.capital[0]}</div>
            <div>Area {response.data.area}</div>
            <h2>Languages</h2>
            <ul>
              {Object.values(response.data.languages).map((language) => (
                <li key={language}>{language}</li>
              ))}
            </ul>
            <img
              src={response.data.flags.png}
              alt={`picture of ${response.data.name.common}'s flag`}
            />
            <h2>Weather in {response.data.capital[0]}</h2>
          </>
        );
      });
  };

  const setCountriesAndWeather = (countries, weather = null) => {
    setCountriesToShow(countries);
    setWeather(weather);
  };

  const handleSearch = (event) => {
    setSearchValue(event.target.value);
    if (event.target.value === "") {
      setCountriesAndWeather(null);
      return;
    }

    const filteredCountires = allCountriesNames.filter((country) =>
      country.toLowerCase().includes(event.target.value.toLowerCase())
    );

    if (filteredCountires.length > 10) {
      setCountriesAndWeather("Too many matches, specify another filter.");
    } else if (filteredCountires.length === 0) {
      setCountriesAndWeather("No match");
    } else if (filteredCountires.length > 1 && filteredCountires.length <= 10) {
      setCountriesAndWeather(
        <>
          {filteredCountires.map((country) => (
            <div key={country}>
              {country}
              <button onClick={() => showCountry(country)}>Show</button>
            </div>
          ))}
        </>
      );
    } else if (filteredCountires.length === 1) {
      showCountry(filteredCountires[0]);
    }
  };

  return (
    <>
      <div>
        find countries{" "}
        <input value={searchValue} onChange={handleSearch}></input>
      </div>
      <div>{countriesToShow}</div>
      {weather && (
        <div>
          <div>Temperature: {weather.main.temp} Celsius</div>
          <div>Wind: {weather.wind.speed} m/s</div>
          <img
            src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
            alt={weather.weather[0].description}
          />
        </div>
      )}
    </>
  );
};
export default App;
