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
  useEffect(() => {
    dispatch(getCountryDetail(id));
  }, [dispatch, id]);

  const country = useSelector((state) => state.detail);

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
    </div>
  );
};

export default CountryDetail;
