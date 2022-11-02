import React from "react";
import styles from "./Activity.module.css";
import { Link } from "react-router-dom";

const CountryActivities = ({ activities }) => {
  return (
    // Recibo activities por destructuring, a lo que le voy a hacer un mapeo y le voy a sacar los atributos de mi modelo
    // actividad, sacando los details de mis actividades para renderizar en mi componente countryDetail.
    // Y le pasamos un botón que nos llevará al componente del formulario para crear actividades.
    <div className={styles.countryActivitiesBox}>
      <div className={styles.countryActivitiesList}>
        <h1>Activities: </h1>
        {activities &&
          activities.map((activity) => {
            return (
              <div key={activity.id} className={styles.countryActivitiesDetail}>
                <ul>
                  <li>
                    <h2>Activity: {activity.name}</h2>
                  </li>
                  <li>
                    <h2>Difficulty: {activity.difficulty}</h2>
                  </li>
                  <li>
                    <h2>Duration: {activity.duration} hs.</h2>
                  </li>
                  <li>
                    <h2>Season: {activity.season}</h2>
                  </li>
                </ul>
                <hr />
              </div>
            );
          })}
      </div>
      <div>
        <Link to="/activity">
          <button className={styles.myBtn}>Create Activities</button>
        </Link>
      </div>
      <div>
        <Link to="/home">
          <button className={styles.myBtn}>Go back</button>
        </Link>
      </div>
    </div>
  );
};

export default CountryActivities;
