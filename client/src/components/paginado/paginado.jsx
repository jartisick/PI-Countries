import React from "react";
import styles from "./Paginado.module.css";

const Paginado = ({ countriesPerPage, allCountries, paginado }) => {
  const pageNumbers = [];
  // creamos una constante que va a ser un array vacío, en donde vamos a pushear el número total de paginas que voy a necesitar
  // para renderizar todos mis países, para ello vamos a hacer un for en donde vamos a dividir todos nuestros países entre la
  // cantidad de países que setié traer por página (12) y lo vamos a redondear porque no podemos tener 12.5 cards por pagina
  for (let i = 0; i <= Math.ceil(allCountries / 10) - 1; i++) {
    pageNumbers.push(i + 1);
  }
  return (
    <>
      <nav>
        <ul className={styles.ulPaged}>
          {pageNumbers &&
            pageNumbers.map((number) => (
              <li className={styles.li}>
                <button key={number} className={styles.pagedButton}>
                  <a onClick={() => paginado(number)}>{number}</a>
                </button>
              </li>
            ))}
        </ul>
      </nav>
    </>
  );
};

export default Paginado;
