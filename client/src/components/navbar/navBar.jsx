import { Link } from "react-router-dom";
import styles from "./navBar.module.css";
import logo from "./pngwing.com.png";

export default function Navbar() {
  return (
    // Aquí básicamente lo que hice fue crear un componente Navbar para renderizar mi logo, el nombre de mi proyecto y
    // el botón crear Actividades, modularizando un poco para no tener tanto desorden en el componente Home (igual hay desorden, pero menos :) )
    <div className={styles.nav}>
      <Link to="/home" className={styles.link}>
        <span className={styles.titulo}>PI-Countries</span>
      </Link>
      <img src={logo} alt="logo" width="50px" heigh="50px" />
      <Link to="/activity">
        <button className={styles.actitivyButton}>Create Activity</button>
      </Link>
    </div>
  );
}
