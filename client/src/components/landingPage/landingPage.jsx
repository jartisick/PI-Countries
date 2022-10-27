import React from "react";
import { Link } from "react-router-dom";
import bgImage from "./video/video-back2.mp4";
import styles from "./LandingPage.module.css";

const LandingPage = () => {
  return (
    <main className={styles.main}>
      <div className={styles.landingPage}>
        <header className={styles.header}>
          <a
            href="https://www.linkedin.com/in/jos%C3%A9-rodr%C3%ADguez-367b2817a/"
            target="_blank"
            rel="noreferrer"
          >
            <img
              className="iconLanding"
              src="https://cdn-icons-png.flaticon.com/512/145/145807.png"
              alt="linkedin"
              width="50px"
              height="50px"
            />
          </a>
          <a
            href="https://jartisick@gmail.com"
            target="_blank"
            rel="noreferrer"
          >
            <img
              className="iconLanding"
              src="https://lh3.googleusercontent.com/8v_oGMOj9bgohn50RgLhJ8XGZ2kIUdr0RG4zCkIYnfjK24ORS0WFaTWmnzxXzagUg2fwAmDy1W_Y4oTtIacT2dhQzAqOy5H9Vg23Rq1oVnhUGtOynjY"
              alt="gmail"
              width="50px"
              height="50px"
            />
          </a>
          <a href=" https://github.com/jartisick" target="_blank">
            <img
              className="iconLanding"
              src="https://www.svgrepo.com/show/217753/github.svg"
              alt="github"
              width="50px"
              height="50px"
            />
          </a>
        </header>

        <h1 className={styles.h1}>
          FIND YOUR
          <br />
          COUNTRY.
        </h1>
        <Link to="/home">
          <button className={styles.myBtn}>Ingresar</button>
        </Link>
      </div>
      <video autoPlay loop muted className={styles.video}>
        <source src={bgImage} type="video/mp4" />
      </video>
      <div className={styles.capa}></div>
    </main>
  );
};

export default LandingPage;
