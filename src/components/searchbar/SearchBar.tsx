import "./SearchBar.scss";
import { ChangeEvent, useState, useMemo } from "react";
import { searchCity } from "../../utils/weatherapi";
import { useNavigate } from "react-router-dom";
import IconButton from "../iconbutton/IconButton";
import { debounce } from "../../utils/debounce";

type city = {
  id: number;
  country: string;
  lat: number;
  lon: number;
  name: string;
  region: string;
  url: string;
};

type searchWindow = {
  showSearchWindow: boolean;
  setShowSearchWindow(showSearchWindow: boolean): void;
  inputValue: string;
  setInputValue(inputValue: string): void;
};

function SearchBar({ showSearchWindow, setShowSearchWindow, inputValue, setInputValue }: searchWindow) {
  const [citiesList, setCitiesList] = useState<city[]>();
  const navigate = useNavigate();

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
              <div className="searchbar__city-link">
                <IconButton
                  buttonFunction={"link"}
                  buttonClick={() => {
                    open(getCityURL());
                  }}
                  buttonText={city.url}
                />
              </div>
            </div>
          );
        });
      } else {
        return <h3>Noch keine Daten...</h3>;
      }
    }
  }

  async function searchTheCities(cityName: string) {
    if (cityName) {
      const foundCities: city[] = await searchCity(cityName);
      setCitiesList(foundCities);
    }
  }

  function handleInputChange(e: ChangeEvent<HTMLInputElement>) {
    setInputValue(e.target.value);

    if (e.target.value !== "") {
      handleSearch(e);

      setShowSearchWindow(true);
    } else {
      setShowSearchWindow(false);
    }
  }

  const handleSearch = useMemo(
    () =>
      debounce((e: ChangeEvent<HTMLInputElement>) => {
        searchTheCities(e.target.value);
      }, 500),
    []
  );

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
