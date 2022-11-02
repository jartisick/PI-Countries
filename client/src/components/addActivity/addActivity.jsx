import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getCountries } from "../../actions";
import { useDispatch, useSelector } from "react-redux";
import styles from "./addActivity.module.css";
import axios from "axios";

const CreateActivity = () => {
  const dispatch = useDispatch();
  const countries = useSelector((state) => state.countries); // me traigo las countries de mi estado countries : []
  // actions dispachadas
  useEffect(() => {
    dispatch(getCountries());
  }, [dispatch]);

  document.title = "Add an Activity!";
  //validaciones/errores

  const validate = (input) => {
    let errors = {}; // me creo un objetito vacío y empiezo a preguntarle
    if (
      !/^[a-zA-Z\s]*$/.test(input.name) ||
      !input.name ||
      input.name.length < 6
    )
      errors.name = "Plase name the activity";
    if (!input.difficulty) errors.difficulty = "Plase add a dificulty (1-5)";
    if (!input.duration || input.duration < 1 || input.duration > 24)
      //actividad de 24 horas
      errors.duration = "Please add the duration (1-24 hs)";
    if (!input.season) errors.season = "Plase select a season";
    if (!input.countryName[0]) errors.countryName = "Select at least 1 country";
    // si en mi estado name/dificulty/duration/ect no hay nada, entonces en mi objeto errors voy a colocar el error correspondiente.
    return errors;
  };

  const [errors, setErrors] = useState({});

  // seteamos nuestro input, le pasamos lo que necesitamos
  const [input, setInput] = useState({
    name: "",
    difficulty: 0,
    duration: 0,
    season: "",
    countryName: [],
  }); // a medida que voy modificando mis inputs, se va llenando este estado

  // manejando cada vez que cambien o se modifiquen mis inputs
  const handleChange = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    }); // el nombre de mi input va a pasar a ser el valor que le pasemos
  };

  //// Select de Countries + Validaciones ////
  const handleCountrySelect = (e) => {
    if (!input.countryName.includes(e.target.value)) {
      //si no le pasamos ningun valor al input
      setInput({
        ...input, //traeme lo que ya tenia
        countryName: [...input.countryName, e.target.value], //y setiame mi input + el valor que le tipeamos
      });
      setErrors(
        //lo mismo que en setInput, pero pasándole la función validadora declarada arriba
        //para pasarle los errors a cada input cuando sea correspondiente.
        validate({
          ...input,
          countryName: [...input.countryName, e.target.value],
        })
      );
    } else {
      //si tengo mi value en el input
      setInput({
        ...input,
        countryName: [...input.countryName],
      }); // la misma logica de siempre, pero sin pasarle el value porque ya lo tengo
      setErrors(
        validate({
          ...input,
          countryName: [...input.countryName],
        })
      ); // de igual manera, pero en este caso con el error validado
    }
  };

  //// Borrar countries Seleccionadas! ////
  const deleteCountry = (e) => {
    e.preventDefault();
    setInput({
      //seteo mi input
      ...input,
      countryName: [...input.countryName.filter((f) => f !== e.target.value)],
    });
    // filtrame por todo lo que no sea ese elemento, de esa forma me va a devolver un estado,
    // en blanco sin el elemento clickeado
  };

  //// Botón de CreateActivity! ////
  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post(`/activities`, input)
      .then(() => {
        setInput({
          name: "",
          difficulty: 0,
          duration: 0,
          season: "",
          countryName: [],
        });
        alert(`Activity ${input.name} Created!`);
      })
      .catch(() => {
        alert(`${input.name} It's already created, try other name!`);
        // Lógica de nombres duplicados
        // nos sacamos la action de post que prácticamente no hacía nada, llamamos al back desde el front y le pasamos el input,
        //como usamos una promise .then y le seteamos el input ahí dentro le mandamos lo que necesito pa submitiar y en el catch
        // le mandamos otra alert que diga que el nombre ya está tomado, porque en la DB lo tengo en unique ese valor.
      });
  };

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit} className={styles.form}>
        <div>
          <Link to="/home">
            <button className={styles.myBtn}>Home</button>
          </Link>
          <h1>Add an Activity!</h1>
          <input
            placeholder="Whats your plan?"
            type="text"
            value={input.name}
            name="name"
            onChange={handleChange}
            className={styles.inputName}
          />
          {errors.name && <p className={styles.error}>{errors.name} </p>}
          {/* pasamos el error de las validaciones. */}
        </div>
        <div className={styles.difficultyCont}>
          <select
            value={input.difficulty}
            name="difficulty"
            onChange={handleChange}
            className={styles.formSelects}
          >
            <option disabled selected>
              -
            </option>
            <option value={1} name="difficulty">
              ★☆☆☆☆
            </option>
            <option value={2} name="difficulty">
              ★★☆☆☆
            </option>
            <option value={4} name="difficulty">
              ★★★★☆
            </option>
            <option value={5} name="difficulty">
              ★★★★★
            </option>
          </select>
          {errors.difficulty && (
            <p className={styles.error}>{errors.difficulty} </p>
          )}
          {/* pasamos el error de las validaciones. */}
        </div>
        <div>
          <input
            type="time" // de tipo tiempo para el relosito
            value={input.duration}
            name="duration"
            onChange={handleChange}
            max="24:00:00"
            min="10:00:00"
            className={styles.inputName}
          />
          {errors.duration && (
            <p className={styles.error}>{errors.duration} </p>
          )}
          {/* le pasamos el error de las validaciones */}
        </div>
        <div className={styles.formSeasonContainer}>
          <select
            className={styles.formSelects}
            name="season"
            onChange={handleChange}
          >
            <option value={null}>Select a season</option>
            <option value={"Summer"} name="season">
              Summer
            </option>
            <option value={"Winter"} name="season">
              Winter
            </option>
            <option value={"Spring"} name="season">
              Spring
            </option>
            <option value={"Fall"} name="season">
              Fall
            </option>
          </select>
          {errors.season && <p className={styles.error}>{errors.season} </p>}
          {/* le pasamos el error de las validaciones */}
        </div>

        <div>
          <select
            name="countries"
            onChange={handleCountrySelect}
            className={styles.countrySelect}
          >
            <option value={null}>Select one or multiple Countries</option>
            {countries?.map((c) => (
              <option key={c.id} value={c.name}>
                {c.name}
              </option>
            ))}
            {/* Misma lógica que en el Home, nuestro estado Countries lo mapeamos y nos traemos el nombre,
            para que renderice eso a nuestro Select */}
          </select>
          {errors.countryName && (
            <p className={styles.error}>{errors.countryName} </p>
          )}
          {/* Y le mandamos el error de las validaciones */}
          <div>
            <h2>Selected Countries</h2>
            <div className={styles.selectedCountries}>
              {input.countryName?.map((c) => {
                return (
                  <div value={c} key={c.id}>
                    <li className={styles.countriesForm} value={c} key={c.id}>
                      {c}
                    </li>
                    <button
                      className={styles.formX}
                      value={c}
                      onClick={deleteCountry}
                    >
                      X
                    </button>
                    {/* Aquí, mapeamos el input.countryName que, en el handleSelect vendría a ser el nombre del país
                  seleccionado. Lo que renderizaremos como una listita con el nombre del mismo y un botón de X
                  para eliminarlo si así lo deseamos. Chequear error en Estilos que se rompe cuando selecciono + de 2. */}
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <div className={styles.formButtons}>
          <button
            className={styles.formButton}
            type="submit"
            onClick={handleSubmit}
            disabled={
              !input.name ||
              !input.countryName ||
              input.difficulty < 1 ||
              !input.difficulty > 5 ||
              input.duration < 1 ||
              input.duration > 24 ||
              !input.season
            }
          >
            Create Activity!
          </button>
          {/* Y aquí, el botón final. Le vamos a decir que sea de tipo "submit", le pasamos el evento y
        lo deshabilitamos si o solo si le falten parámetros del formulario, una vez estén todos 
        el botón estará disponible nuevamente :) */}
        </div>
      </form>
    </div>
  );
};

export default CreateActivity;
