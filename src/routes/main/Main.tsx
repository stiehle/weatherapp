import "./Main.scss";
import Footer from "../../components/Footer";
import SearchBar from "../../components/SearchBar";
import CitiesItem from "../../components/CityItems";

export function Main() {
  return (
    <>
      <div className="main">
        <div className="main__header">Wetter</div>
        <div className="main__search-bar">
          <SearchBar />
        </div>
        <div className="main__city-items">
          <CitiesItem />
        </div>
        <Footer />
      </div>
    </>
  );
}

export default Main;
