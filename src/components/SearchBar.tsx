import { ChangeEvent, useState } from "react";
import "./SearchBar.scss";
import { searchCity } from "../utils/weatherapi";

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

  async function searchTheCities(city: string) {
    const foundCities = await searchCity(city);
    // console.log(foundCities);
    setCitiesList(foundCities);
  }

  function showCitiesList() {
    function selectCity(id: number) {
      console.log("geklickt", id);
      setInputValue(" ");
      setShowSearchWindow(false);
    }

    if (citiesList) {
      return citiesList.map((city) => {
        return (
          <div key={city.id}>
            <button
              onClick={() => {
                selectCity(city.id);
              }}>
              {city.name}, {city.country}
            </button>
          </div>
        );
      });
    } else {
      return (
        <>
          <p>Noch keine Daten</p>
        </>
      );
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
        <input className="searchbar__input-field" name="searchBar" type="text" onChange={handleInputChange} value={inputValue} />
        {showSearchWindow && <div className="searchbar__search-window--show">{showCitiesList()}</div>}
      </div>
    </div>
  );
}

export default SearchBar;
