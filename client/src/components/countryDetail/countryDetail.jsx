import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCountryDetail } from "../../actions";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import styles from "./countryDetail.module.css";
import CountryActivities from "./Activities/Activity.jsx";

const CountryDetail = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  // devuelve un objeto de pares clave/valor de los parámetros dinámicos de la URL que coincidieron con el <Route path>
  useEffect(() => {
    dispatch(getCountryDetail(id));
  }, [dispatch, id]);
  // dispacho mi action, así cuando el componente se monte me va a renderizar los detalles del country q me traigo por props
  const country = useSelector((state) => state.detail);
  // me traigo mi estado global detail, country pasa a ser mis countries, a las que le sacaré la info por props
  return (
    <div className={styles.container}>
      <div className={styles.boxCountry}>
        <div>
          <h1>{country.name}</h1>
          <h2>{country.id}</h2>
        </div>
        <div>
          <div>
            <img
              className={styles.img}
              src={country.flags}
              alt="Img not found"
            />
          </div>
          <div className={styles.content}>
            <ul>
              <li>Continent: {country.continent}</li>
              <li>Capital: {country.capital}</li>
              <li>Population: {country.population}</li>
              <li>Area: {country.area} Kilometers</li>
            </ul>
          </div>
        </div>
      </div>

      <div className={styles.contryDetailActivities}>
        <CountryActivities activities={country.activities} />
      </div>
      {/*me traigo mi componente de Actividades y le paso tambien por props las actividades a renderizar 
       del país de la id correspondiente  */}
    </div>
  );
};

export default CountryDetail;
