import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
// actions
import {
  getCountries,
  getFilteredContinent,
  orderByName,
  orderByPopulation,
  getActivities,
  byActivity,
} from "../../actions";
// components
import Country from "../country/country";
import Paginado from "../paginado/paginado";
import styles from "./home.module.css";
import Navbar from "../navbar/navBar";
import SearchBar from "../navbar/SearchBar";

const Home = () => {
  const dispatch = useDispatch();
  const allCountries = useSelector((state) => state.countries); // estado local, array de countries, bd, api
  document.title = "PI-Countries";
  const [orden, setOrden] = useState("");
  // //PAGINADO
  const [currentPage, setCurrentPage] = useState(1);
  // // estado con la pagina actual y un estado que me setee la pagina actual. seteado en 1 porque siempre vamos a iniciar en la primera pagina.
  const countriesPerPage = 10;
  // // cuantos paises tengo por pagina que va a setear los países por pagina.
  const indexOfLastCountry = currentPage * countriesPerPage; //10
  // // Mi página (1) * Mis personajes por página (10) = 10
  if (indexOfLastCountry === 10) {
    // si mi pagina tiene 10 paises
    var iFirstCountry = 1; // seteamos una variable con valor 1
  } else {
    iFirstCountry = indexOfLastCountry - countriesPerPage; //0
  }
  // //indexOfLastCountry(12) - cuntriesPerPage(12) = 0
  // Pag.1 --> 0------9
  // Pag.2 --> 10------19
  const currentCountries = allCountries.slice(
    iFirstCountry - 1,
    indexOfLastCountry - 1
  );
  // // Acá le voy a decir, agarrá y tomá solamente el indice del primer country y el indice del ultimo country
  // // estando en la pagina uno yo le voy a decir que tome todo el arreglo de cuntries y solamente me duelva desde el indice
  // del primer pais hasta el indice del ultimo pais menos 1 porque queremos mostrar 9 en la primera pagina

  const paginado = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  // useEffect de getCountries
  useEffect(() => {
    dispatch(getCountries());
  }, [dispatch]);

  const handleFilterContinent = (event) => {
    dispatch(getFilteredContinent(event.target.value));
    // Tengo una acción, que se va a disparar dependiendo de algo que va a estar pasando. Entonces, despachamos la acción
    // y le paso el event.target.value, donde por value me estoy refiriendo a las opciones de mi SELECT.
  };

  const handleFilterByName = (event) => {
    event.preventDefault();
    dispatch(orderByName(event.target.value));
    setCurrentPage(1);
    setOrden(`Ordenado ${event.target.value}`);
  };

  const handleSortPopulation = (event) => {
    event.preventDefault();
    dispatch(orderByPopulation(event.target.value));
    setCurrentPage(1);
    setOrden(`Ordenado ${event.target.value}`);
  };

  const activities = useSelector((state) => state.activities);
  // useEffect de Activities
  useEffect(() => {
    dispatch(getActivities());
  }, [dispatch]);

  const handleActivities = (event) => {
    event.preventDefault();
    dispatch(byActivity(event.target.value));
  };
  return (
    <div>
      <div className={styles.containerNav}>
        <Navbar />
        <div className={styles.container}>
          <div className={styles.filtros}>
            {/* By Alphabetic Order */}
            <div className={styles.alphabetic}>
              <select onChange={(event) => handleFilterByName(event)}>
                <option disabled selected>
                  Order by
                </option>
                <option value="ascendente">A-Z</option>
                <option value="descendente">Z-A</option>
              </select>
            </div>
            {/* By Population */}
            <div className={styles.populationContinent}>
              <select onChange={(event) => handleSortPopulation(event)}>
                <option disabled selected>
                  By Population
                </option>
                <option value="ascendente">Most Populated</option>
                <option value="descendente">Least Populated</option>
              </select>
            </div>
            {/* By Continent */}
            <div className={styles.populationContinent}>
              <select onChange={(event) => handleFilterContinent(event)}>
                <option value="All">All Continents</option>
                <option value="Africa">Africa</option>
                <option value="Antarctica">Antarctica</option>
                <option value="Asia">Asia</option>
                <option value="Europe">Europe</option>
                <option value="North America">North America</option>
                <option value="Oceania">Oceania</option>
                <option value="South America">South America</option>
              </select>
            </div>

            {/* Activities */}
            <div className={styles.activitiesSelect}>
              <select onChange={handleActivities}>
                <option value="All">All</option>
                {activities.map((act) => (
                  <option value={act.name}>{act.name}</option>
                ))}
              </select>
            </div>
          </div>
          {/* SearchBar */}
          <div className={styles.searchbar}>
            <SearchBar />
          </div>
        </div>
      </div>
      {/* Paged */}
      <Paginado
        countriesPerPage={countriesPerPage}
        allCountries={allCountries.length}
        paginado={paginado}
      />
      {/* Cards Render */}
      <div className={styles.countryCards}>
        {currentCountries?.map((country) => {
          return (
            <div key={country.id}>
              <Link to={"/home/" + country.id} className={styles.link}>
                <Country
                  flags={country.flags}
                  name={country.name}
                  continent={country.continent}
                />
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Home;
