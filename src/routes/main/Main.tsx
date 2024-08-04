import "./Main.scss";
import Footer from "../../components/Footer";

export function Main() {
  return (
    <>
      <div className="main">
        <div className="main__header">Wetter</div>
        <div className="main__search-bar">Search</div>
        <div className="main__city-items">Items</div>
      </div>
      <Footer />
    </>
  );
}

export default Main;
