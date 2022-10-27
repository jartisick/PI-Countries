import React from "react";
import styles from "./Activity.module.css";
import { Link } from "react-router-dom";

const CountryActivities = ({ activities }) => {
  return (
    <div className={styles.countryActivitiesBox}>
      <div className={styles.countryActivitiesList}>
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
              </div>
            );
          })}
      </div>
      <div>
        <Link to="/activity">
          <button className={styles.myBtn}>Create More Activities</button>
        </Link>
      </div>
    </div>
  );
};

export default CountryActivities;
