import React from "react";
import styles from "./country.module.css";

const Country = ({ name, id, flags, continent }) => {
  return (
    <div className={styles.box}>
      <div className={styles.imgCard}>
        <img src={flags} alt="Flag Not Found" />
      </div>
      <div className={styles.content}>
        <h1>{name}</h1>
        <label>{id}</label>
        <label>{continent}</label>
      </div>
    </div>
  );
};

export default Country;
