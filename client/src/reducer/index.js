const initialState = {
  countries: [],
  allCountries: [], // Una copia del estado que siempre tiene todos los países,
  activities: [],
  detail: [],
};
// siempre concatenamos todo el estado anterior, la idea es que siempre devolvamos el estado completo y modifiquemos
// solo el arreglo correspondiente.
const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case "GET_COUNTRIES":
      return {
        ...state,
        countries: action.payload, // Cuando me traigo todos los paises -->
        allCountries: action.payload, // Méteme todos los countries en allCountries también
      };
    case "GET_FILTERED_CONTINENT":
      const allContinents = state.allCountries; // Cuando filtres, primero todos los paises siempre va a ser el arreglo que tiene todo, el nuevo
      const continentFiltered =
        action.payload === "All"
          ? allContinents
          : allContinents.filter((ele) => ele.continent === action.payload);
      // si mi action.payload es "All" me devolverás todo lo que tiene dentro, de no ser así filtramos nuestro state y le digo
      // por cada país si tu continente es igual a mi payload devolveme eso
      return {
        ...state,
        countries: continentFiltered, // Cuando yo vuelva a hacer otra vez el filtro va a voler a agarrar ALLCONTINENTES que tiene todo, pero
        // me va a modificar este que estoy devolviend, por lo tanto no me quedaré sin datos y siempre va a renderizar correctamente
      };
    //Primero pregunto si mi action.payload es ascendente, si es así, ejecuto el sort para ordenarlos de manera ascendente
    //si es así, accede a mi estado countries, que es el que estamos renderizando y hacele un sort.
    case "ORDER_BY_NAME":
      let sortedArr =
        action.payload === "ascendente"
          ? state.countries.sort((a, b) => {
              if (a.name > b.name) return 1;
              if (b.name > a.name) return -1;
              return 0;
            })
          : // básicamente yo le voy a decir "A-Z". si countryA.name es mayor a countryB.name, devolveme la posición 1,
            //porque le pedimos el ascendente, entonces la posición 1 sería countryB.name, el elemento "menor".
            //si son iguales, me los deja como está. devuelve 0.
            state.countries.sort((a, b) => {
              if (a.name > b.name) return -1;
              if (b.name > a.name) return 1;
              return 0;
            });
      return {
        ...state,
        countries: sortedArr,
      };

    // El método sort() ordena los elementos de un arreglo (array) localmente y devuelve el arreglo ordenado
    // lo que hace es ir comparando e ir poniéndoles a la derecha o a la izquierda, dependiendo si son
    // más grandes o más chicos. Si son iguales no hace nada.

    case "ORDER_BY_POPULATION":
      let sortedPopulation =
        action.payload === "ascendente"
          ? state.countries.sort((a, b) => {
              if (a.population > b.population) return -1;
              if (b.population > a.population) return 1;
              return 0;
            })
          : // Misma lógica de arriba, pero, si es más grande devolveme a.population(countryA.population), si no pos lo contrario
            // y si son iguales déjalo así como está.
            state.countries.sort((a, b) => {
              if (a.population > b.population) return 1;
              if (b.population > a.population) return -1;
              return 0;
            });
      return {
        ...state,
        countries: sortedPopulation,
      };
    case "GET_COUNTRIES_PER_NAME":
      return {
        ...state, // una copia del estado
        countries: action.payload, // me lleno arreglo contries de la data
      };

    case "GET_ACTIVITIES":
      return {
        ...state,
        activities: action.payload,
      };

    case "GET_COUNTRY_DETAIL":
      return {
        ...state,
        detail: action.payload, // lleno mi arreglo de detail de countries
      };

    case "BY_ACTIVITY":
      return {
        ...state,
        countries:
          action.payload === "All" // si mi action.payload es All
            ? state.allCountries // traeme todos los paises con actividad
            : state.allCountries.filter((c) =>
                c.activities.find((a) => a.name === action.payload)
              ),
        //  si no es All, va a traer todas los countries que correspondan o coincidan
        // con lo que se selecciona en el filtro de actividad, mi action.payload
      };
    case "LEAST_POPULATION":
      const filtrado0 = state.allCountries;
      const countriesFiltered = filtrado0.filter((el) => el.population === 0);

      return {
        ...state,
        countries: countriesFiltered,
      };
    default:
      return state;
  }
};

export default rootReducer;
