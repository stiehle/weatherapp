import "./CitiesItem.scss";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import CityItem from "../cityitem/CityItem";
import { CitiesContext } from "../../context/CitiesContext";
import { setLocalStorage } from "../../utils/localStorage";
import IconButton from "../iconbutton/IconButton";

type mode = {
  edit: boolean;
};

function CitiesItem({ edit }: mode) {
  const navigate = useNavigate();
  const myCities = useContext(CitiesContext);

  function buttonDeleteCity(id: number) {
    const newCities = myCities.cities.filter((city) => {
      return city !== id;
    });

    myCities.setCities(newCities);
    setLocalStorage(newCities);
  }

  return myCities.cities.map((city) => {
    return (
      <div
        key={city}
        className="cities-item"
        onClick={() => {
          !edit && navigate(`city/${city}`);
        }}>
        {edit && (
          <div className="cities-item__delete">
            {/* <button
              onClick={() => {
                buttonDeleteCity(city);
              }}>
              Löschen
            </button> */}
            <IconButton
              buttonFunction={"trash"}
              buttonClick={() => {
                buttonDeleteCity(city);
              }}
              buttonText={"Löschen"}
            />
          </div>
        )}
        <CityItem id={city} />
      </div>
    );
  });
}

export default CitiesItem;
