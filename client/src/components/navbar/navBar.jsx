import { Link } from "react-router-dom";
import styles from "./navBar.module.css";
import logo from "./pngwing.com.png";

export default function Navbar() {
  return (
    <div className={styles.nav}>
      <span className={styles.titulo}>PI-Countries</span>
      <img src={logo} alt="logo" width="50px" heigh="50px" />
      <Link to="/activity">
        <button className={styles.actitivyButton}>Create Activity</button>
      </Link>
    </div>
  );
}
