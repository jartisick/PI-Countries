import React from "react";
import styles from "./Paginado.module.css";

const Paginado = ({ countriesPerPage, allCountries, paginado }) => {
  const pageNumbers = [];
  // creamos una constante que va a ser un array vacío, en donde vamos a pushear el número total de paginas que voy a necesitar
  // para renderizar todos mis países, para ello vamos a hacer un for en donde vamos a dividir todos nuestros países entre la
  // cantidad de países que quiero traer por página (10) y lo vamos a redondear porque no podemos tener 10.5 cards por pagina
  for (let i = 0; i <= Math.ceil(allCountries / 10) - 1; i++) {
    // el -1 en el for es para evitar la página adicional
    pageNumbers.push(i + 1); // i + 1 porque si no me renderiza desde la pag 0 y necesitamos que sea desde la pag 1
  }
  return (
    <>
      <nav className={styles.paged}>
        <ul>
          {pageNumbers &&
            pageNumbers.map((number) => (
              <li className={styles.active}>
                <button key={number}>
                  <a onClick={() => paginado(number)}>{number}</a>
                  {/* le paso un link, cuando le hago click le voy a pasar la constante que es la const que 
                declaré en el home y le paso el número de la página, para que por cada button me renderice el numero de pagina */}
                </button>
              </li>
            ))}
        </ul>
      </nav>
    </>
  );
};

export default Paginado;
