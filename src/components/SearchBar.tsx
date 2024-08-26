import { ChangeEvent, useState } from "react";
import "./SearchBar.scss";
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
  const [inputValue, setInputValue] = useState<string>(" ");

  const navigate = useNavigate();

  async function searchTheCities(cityId: string) {
    const foundCities: city[] = await searchCity(cityId);
    console.log("found", foundCities);
    setCitiesList(foundCities);
  }

  function showCitiesList() {
    function selectCity(id: number) {
      console.log("geklickt", id);
      setInputValue(" ");
      setShowSearchWindow(false);
      navigate("City", { state: id });
    }

    if (citiesList) {
      console.log("Yess", citiesList);
      if (citiesList.length !== 0) {
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
        console.log("noch keine Daten");
        return <h3>Noch keine Daten...</h3>;
      }
    }
  }

  function handleInputChange(changeEvent: ChangeEvent<HTMLInputElement>) {
    if (changeEvent.target.value !== "") {
      setShowSearchWindow(true);
      searchTheCities(changeEvent.target.value);
      setInputValue(changeEvent.target.value);
    } else {
      setShowSearchWindow(false);
    }
    console.log(changeEvent.target.value);
  }

  return (
    <div className="searchbar">
      <div className="searchbar__wrapper">
        <label htmlFor="searchbar"></label>
        <input id="searchbar" className="searchbar__input-field" name="searchbar" type="text" onChange={handleInputChange} value={inputValue} />
        {showSearchWindow && <div className="searchbar__search-window--show">{showCitiesList()}</div>}
      </div>
    </div>
  );
}

export default SearchBar;
