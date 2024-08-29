import { IconContext } from "react-icons";
import "./CityNavigation.scss";
import { CgChevronLeftR } from "react-icons/cg";
import { useNavigate, useParams } from "react-router-dom";
import { FaRegStar, FaStar } from "react-icons/fa";
import { useContext, useEffect, useState } from "react";
import { CitiesContext } from "../context/CitiesContext";
import { setLocalStorage } from "../utils/localStorage";

function CityNavigation() {
  const [itemInCities, setItemInCities] = useState<boolean>(false);

  const navigate = useNavigate();
  const myCities = useContext(CitiesContext);
  // const { state } = useLocation();
  const { itemId } = useParams();

  useEffect(() => {
    cityInCities();
  }, []);

  function cityInCities() {
    console.log(itemId, myCities);
    const cityInCities = myCities.cities.find((city) => {
      return city === Number(itemId);
    });
    if (cityInCities) {
      console.log(cityInCities);
      setItemInCities(true);
    }
  }

  function addCityInMyCities() {
    // console.log(state);
    const newCities = myCities.cities;
    newCities.push(Number(itemId));
    console.log(newCities);
    cityInCities();
    setLocalStorage(newCities);
  }

  return (
    <div className="city__navigation">
      <IconContext.Provider value={{ size: "40px" }}>
        <CgChevronLeftR
          onClick={() => {
            navigate("/");
          }}
        />
        {itemInCities ? (
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
