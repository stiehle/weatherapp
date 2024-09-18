import "./CityNavigation.scss";
import { IconContext } from "react-icons";
import { CgChevronLeftR } from "react-icons/cg";
import { useNavigate, useParams } from "react-router-dom";
import { FaRegStar, FaStar } from "react-icons/fa";
import { useContext, useEffect, useState } from "react";
import { CitiesContext } from "../../context/CitiesContext";
import { setLocalStorage } from "../../utils/localStorage";

function CityNavigation() {
  const [itemInCities, setItemInCities] = useState<boolean>(false);

  const navigate = useNavigate();
  const myCities = useContext(CitiesContext);
  const { itemId } = useParams();

  useEffect(() => {
    cityInCities();
  }, []);

  function cityInCities() {
    const cityInCities = myCities.cities.find((city) => {
      return city === Number(itemId);
    });
    if (cityInCities) {
      setItemInCities(true);
    }
  }

  function addCityInMyCities() {
    const newCities = myCities.cities;
    newCities.push(Number(itemId));

    cityInCities();
    setLocalStorage(newCities);
  }

  return (
    <div className="city-navigation">
      <IconContext.Provider value={{ size: "40px" }}>
        <CgChevronLeftR
          onClick={() => {
            navigate("/");
          }}
          className="city-navigation__icon"
        />
        {itemInCities ? (
          <FaStar />
        ) : (
          <FaRegStar
            onClick={() => {
              addCityInMyCities();
            }}
            className="city-navigation__icon"
          />
        )}
      </IconContext.Provider>
    </div>
  );
}

export default CityNavigation;
