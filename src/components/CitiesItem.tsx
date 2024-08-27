import { useContext } from "react";
import "./CitiesItem.scss";
import { useNavigate } from "react-router-dom";
import CityItem from "./CityItem";
import { CitiesContext } from "../context/CitiesContext";
import { setLocalStorage } from "../utils/localStorage";

type mode = {
  edit: boolean;
};

function CitiesItem({ edit }: mode) {
  // const [cities, setCities] = useState<number[]>([576216, 2618724, 623685, 386789, 267097, 604791, 9000293, 9000433]);
  const navigate = useNavigate();
  const myCities = useContext(CitiesContext);

  function buttonDeleteCity(id: number) {
    console.log(id);

    const newCities = myCities.cities.filter((city) => {
      return city !== id;
    });
    // console.log(newCities);
    myCities.setCities(newCities);
    setLocalStorage(newCities);
  }

  // onClick={() => {
  //   !edit && navigate("City", { state: { city, cities } });
  // }}>

  return myCities.cities.map((city) => {
    return (
      <div
        key={city}
        className="cities-item"
        onClick={() => {
          !edit && navigate("City", { state: city });
        }}>
        {edit && (
          <div className={"cities-item__delete"}>
            <button
              onClick={() => {
                buttonDeleteCity(city);
              }}>
              Löschen
            </button>
          </div>
        )}
        <CityItem id={city} />
      </div>
    );
  });
}

export default CitiesItem;
