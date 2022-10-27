const initialState = {
  countries: [],
  allCountries: [], // Una copia del estado que siempre tiene todos los países,
  activities: [],
  detail: [],
};

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
    case "ORDER_BY_NAME":
      let sortedArr =
        action.payload === "ascendente"
          ? state.countries.sort((a, b) => {
              if (a.name > b.name) return 1;
              if (b.name > a.name) return -1;
              return 0;
            })
          : state.countries.sort((a, b) => {
              if (a.name > b.name) return -1;
              if (b.name > a.name) return 1;
              return 0;
            });
      return {
        ...state,
        countries: sortedArr,
      };

    case "ORDER_BY_POPULATION":
      let sortedPopulation =
        action.payload === "ascendente"
          ? state.countries.sort((a, b) => {
              if (a.population > b.population) return -1;
              if (b.population > a.population) return 1;
              return 0;
            })
          : state.countries.sort((a, b) => {
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
    case "POST_ACTIVITY": // devolvéme el estado como está, porque yo voy a crear la activity en una ruta nueva
      return {
        ...state,
      };

    case "GET_ACTIVITIES":
      return {
        ...state,
        activities: action.payload,
      };

    case "FILTER_BY_ACTIVITY":
      const countries = state.allCountries;

      const filter = countries.filter((c) => {
        let activity = c.activities.filter((a) =>
          a.name.includes(action.payload)
        );
        if (activity.length > 0) {
          return true;
        }
        return false;
      });

      let countryActivity = action.payload === "all" ? countries : filter;
      if (!countryActivity[0]) countryActivity = "error";

      return {
        ...state,
        countries: countryActivity,
      };

    case "GET_COUNTRY_DETAIL":
      return {
        ...state,
        detail: action.payload,
      };

    case "BY_ACTIVITY":
      const allCountriesActivities = state.countries;
      const filteredActivities =
        action.payload === "all"
          ? allCountriesActivities.filter((p) =>
              p.activities[0]?.name ? p.activities[0] : false
            )
          : allCountriesActivities.filter((p) =>
              p.activities.some(({ name }) => name === action.payload)
            );
      return {
        ...state,
        allCountries: filteredActivities,
      };

    default:
      return state;
  }
};

export default rootReducer;
