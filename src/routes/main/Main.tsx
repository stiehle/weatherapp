import "./Main.scss";
import Footer from "../../components/Footer";
import SearchBar from "../../components/SearchBar";
import CitiesItem from "../../components/CitiesItem";
import { useState } from "react";

function Main() {
  // const mode = useContext(EditModeContext);
  const [citiesEdit, setCitesEdit] = useState<boolean>(false);

  function buttonEdit() {
    // console.log("Button geklickt");
    // mode.editMode = true;
    if (citiesEdit) {
      setCitesEdit(false);
    } else setCitesEdit(true);
  }
  return (
    <>
      <div className="main">
        <div className="main__header">
          <h1>Wetter</h1>
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
