import { IconContext } from "react-icons";
import "./CityNavigation.scss";
import { CgChevronLeftR } from "react-icons/cg";
import { useLocation, useNavigate } from "react-router-dom";
import { FaRegStar, FaStar } from "react-icons/fa";
import { useContext, useEffect, useState } from "react";
import { CitiesContext } from "../context/CitiesContext";

function CityNavigation() {
  const [stateInCities, setStateInCities] = useState<boolean>(false);

  const navigate = useNavigate();
  const myCities = useContext(CitiesContext);
  const { state } = useLocation();

  useEffect(() => {
    cityInCities();
  }, []);

  function cityInCities() {
    console.log(state, myCities);
    const cityInCities = myCities.cities.find((city) => {
      return city === state;
    });
    if (cityInCities) {
      console.log(cityInCities);
      setStateInCities(true);
    }
  }

  function addCityInMyCities() {
    console.log(state);
  }

  return (
    <div className="city__navigation">
      <IconContext.Provider value={{ size: "40px" }}>
        <CgChevronLeftR
          onClick={() => {
            navigate("/");
          }}
        />
        {stateInCities ? (
          <FaStar />
        ) : (
          <FaRegStar
            onClick={() => {
              addCityInMyCities();
            }}
            className="city__navigation-icon"
          />
        )}
      </IconContext.Provider>
    </div>
  );
}

export default CityNavigation;
