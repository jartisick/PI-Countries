import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { postActivity, getActivities, getCountries } from "../../actions";
import { useDispatch, useSelector } from "react-redux";
import styles from "./addActivity.module.css";

const CreateActivity = () => {
  const dispatch = useDispatch();
  const countries = useSelector((state) => state.countries); // me traigo las actividades de mi estado activities : []
  const history = useHistory();

  // actions dispachadas
  useEffect(() => {
    dispatch(getActivities());
    dispatch(getCountries());
    dispatch(postActivity());
  }, [dispatch]);

  document.title = "Add an Activity!";
  //validaciones/errores
  const validate = (input) => {
    let errors = {}; // me creo un objetito vacío y empiezo a preguntarle
    if (!input.name) errors.name = "Plase name the activity";
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

  const [success, setSuccess] = useState("");
  // manejando cada vez que cambien o se modifiquen mis inputs
  const handleChange = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    }); // el nombre de mi input va a pasar a ser el valor que le pasemos
  };

  // const handleCheck = (e) => {
  //   if (e.target.checked)
  //     //si selecciono de mi checkbox alguna season
  //     setInput({
  //       ...input,
  //       season: e.target.value,
  //     });
  // };

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

  const deleteCountry = (e) => {
    //para borrar countries seleccionadas
    e.preventDefault();
    setInput({
      //seteo mi input
      ...input,
      countryName: [...input.countryName.filter((f) => f !== e.target.value)],
    });
    // filtrame por todo lo que no sea ese elemento, de esa forma me va a devolver un estado,
    // en blanco sin el elemento clickeado
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(postActivity(input));
    setInput({
      name: "",
      difficulty: 0,
      duration: 0,
      season: "",
      countryName: [],
    });
    setSuccess(`Activity ${input.name} Created!`);
    // history.push("/home");
  };

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit} className={styles.form}>
        <div>
          <Link to="/home">
            <button className={styles.myBtn}>Volver</button>
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
        </div>
        <div>
          <input
            type="time"
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
          </select>
          {errors.countryName && (
            <p className={styles.error}>{errors.countryName} </p>
          )}
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
        </div>
      </form>
    </div>
  );
};

export default CreateActivity;
