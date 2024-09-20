import "./Main.scss";
import Footer from "../../components/footer/Footer";
import SearchBar from "../../components/searchbar/SearchBar";
import CitiesItem from "../../components/citiesitem/CitiesItem";
import { useState } from "react";
import { WiDayHail } from "react-icons/wi";
import MultiButton from "../../components/multibutton/MultiButton";

function Main() {
  const [citiesEdit, setCitiesEdit] = useState<boolean>(false);
  const [showSearchWindow, setShowSearchWindow] = useState<boolean>(false);
  const [inputValue, setInputValue] = useState<string>("");

  return (
    <>
      <div className="main">
        <div className="main__header">
          <div className="main__header-wrapper">
            <h1>Wetter</h1>
            <WiDayHail className="main__header-icon" />
          </div>
          {/* <button onClick={buttonEdit}>Bearbeiten</button> */}
          <MultiButton
            showSearchWindow={showSearchWindow}
            setShowSearchWindow={setShowSearchWindow}
            citiesEdit={citiesEdit}
            setCitiesEditMode={setCitiesEdit}
            setInputValue={setInputValue}
          />
        </div>
        <div className="main__search-bar">
          <SearchBar showSearchWindow={showSearchWindow} setShowSearchWindow={setShowSearchWindow} inputValue={inputValue} setInputValue={setInputValue} />
        </div>
        <div className="main__cities-items">
          <CitiesItem edit={citiesEdit} />
        </div>
        <Footer />
      </div>
    </>
  );
}

export default Main;
