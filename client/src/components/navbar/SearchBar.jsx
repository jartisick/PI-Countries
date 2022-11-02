import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { getCountriesPerName } from "../../actions";
import styles from "./SearchBar.module.css";

const SearchBar = ({ setCurrentPage }) => {
  const dispatch = useDispatch();
  const [search, setSearch] = useState("");

  const handleChange = (event) => {
    event.preventDefault(event);
    setSearch(event.target.value); // agarro el value del input
  };

  //despachamos la action y le pasamos el estado local 'search', yo voy a ir
  // guardando lo que está escribendo el usuario en mi estado local name, lo que yo tengo en mi estado local,
  // le va a llegar a mi action, que va a llamar al back y le va a pasar lo que estamos escribiendo, el "name" del pais.

  const handleSubmit = (event) => {
    event.preventDefault(event);
    dispatch(getCountriesPerName(search));
    setSearch("");
    setCurrentPage(1);
  };

  return (
    <div className={styles.box}>
      <div className={styles.container}>
        <input
          type="text"
          placeholder="Find your country..."
          onChange={(event) => handleChange(event)}
        ></input>
        <button
          className={styles.myBtn}
          type="submit"
          onClick={(event) => handleSubmit(event)}
        >
          Search
        </button>
      </div>
    </div>
  );
};

export default SearchBar;
