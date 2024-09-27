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
  // const [showSearchWindow, setShowSearchWindow] = useState(false);
  // const [inputValue, setInputValue] = useState<string>("");

  const navigate = useNavigate();

  // const [debouncedInputValue, setDebouncedInputValue] = useState<string>("");

  // useEffect(() => {
  //   const timeoutId = setTimeout(() => {
  //     console.log("debounce useEffect", debouncedInputValue);
  //     if (debouncedInputValue) searchTheCities(debouncedInputValue);
  //   }, 500);
  //   return () => clearTimeout(timeoutId);
  // }, [debouncedInputValue, 500]);

  // async function searchTheCities(cityName: string) {
  //   console.log("city", cityName);
  //   const foundCities: city[] = await searchCity(cityName);
  //   setCitiesList(foundCities);
  // }

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
                {/* <a href={getCityURL()} target="_blank"> */}

                <IconButton
                  buttonFunction={"link"}
                  buttonClick={() => {
                    open(getCityURL());
                  }}
                  buttonText={city.url}
                />
                {/* search: {city.url} */}
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
    console.log("city", cityName);
    const foundCities: city[] = await searchCity(cityName);
    setCitiesList(foundCities);
  }

  function handleInputChange(e: ChangeEvent<HTMLInputElement>) {
    console.log("handle", e);
    setInputValue(e.target.value);
    handler(e);

    // if (changeEvent.target.value !== "") {
    //   searchTheCities(changeEvent.target.value);

    //   setShowSearchWindow(true);
    // } else {
    //   setShowSearchWindow(false);
    // }
  }

  const handler = useMemo(
    () =>
      debounce((ev: ChangeEvent<HTMLInputElement>) => {
        console.log(ev);
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
        {inputValue}

        {showSearchWindow && <div className="searchbar__search-window">{showCitiesList()}</div>}
      </div>
    </div>
  );
}

export default SearchBar;
