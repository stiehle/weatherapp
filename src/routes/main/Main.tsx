import "./Main.scss";
import Footer from "../../components/Footer";
import SearchBar from "../../components/SearchBar";
import CitiesItem from "../../components/CitiesItem";
import { useState } from "react";
import { WiDayHail } from "react-icons/wi";

function Main() {
  const [citiesEdit, setCitesEdit] = useState<boolean>(false);

  function buttonEdit() {
    if (citiesEdit) {
      setCitesEdit(false);
    } else setCitesEdit(true);
  }
  return (
    <>
      <div className="main">
        <div className="main__header">
          <div className="main__header-wrapper">
            <h1>Wetter</h1>
            <WiDayHail className="main__header-icon" />
          </div>
          <button onClick={buttonEdit}>Bearbeiten</button>
        </div>
        <div className="main__search-bar">
          <SearchBar />
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
