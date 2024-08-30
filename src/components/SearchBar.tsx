import "./SearchBar.scss";
import { ChangeEvent, useState } from "react";
import { searchCity } from "../utils/weatherapi";
import { useNavigate } from "react-router-dom";

type city = {
  id: number;
  country: string;
  lat: number;
  lon: number;
  name: string;
  region: string;
  url: string;
};

function SearchBar() {
  const [citiesList, setCitiesList] = useState<city[]>();
  const [showSearchWindow, setShowSearchWindow] = useState(false);
  const [inputValue, setInputValue] = useState<string>("");

  const navigate = useNavigate();

  async function searchTheCities(cityId: string) {
    const foundCities: city[] = await searchCity(cityId);
    setCitiesList(foundCities);
  }

  function showCitiesList() {
    function selectCity(id: number) {
      setInputValue(" ");
      setShowSearchWindow(false);
      navigate(`city/${id}`);
    }

    if (citiesList) {
      if (citiesList.length > 0) {
        return citiesList.map((city) => {
          function getCityURL() {
            return "http://google.com/search?q=" + city.url;
          }

          return (
            <div key={city.id}>
              <button
                onClick={() => {
                  selectCity(city.id);
                }}>
                {city.name}, {city.country}
              </button>
              <div>
                <a href={getCityURL()} target="_blank">
                  search: {city.url}
                </a>
              </div>
            </div>
          );
        });
      } else {
        return <h3>Noch keine Daten...</h3>;
      }
    }
  }

  function handleInputChange(changeEvent: ChangeEvent<HTMLInputElement>) {
    setInputValue(changeEvent.target.value);
    setShowSearchWindow(true);
    setShowSearchWindow(false);

    if (changeEvent.target.value !== "") {
      searchTheCities(changeEvent.target.value);
      setShowSearchWindow(true);
    } else {
      setShowSearchWindow(false);
    }
  }

  return (
    <div className="searchbar">
      <div className="searchbar__wrapper">
        <label htmlFor="searchbar"></label>
        <input
          id="searchbar"
          className="searchbar__input-field"
          name="searchbar"
          type="text"
          onChange={handleInputChange}
          value={inputValue}
          spellCheck="false"
        />
        {showSearchWindow && <div className="searchbar__search-window">{showCitiesList()}</div>}
      </div>
    </div>
  );
}

export default SearchBar;
