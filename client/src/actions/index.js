import axios from "axios";

export const GET_COUNTRIES = "GET_COUNTRIES";
export const GET_FILTERED_CONTINENT = "GET_FILTERED_CONTINENT";
export const ORDER_BY_NAME = "ORDER_BY_NAME";
export const ORDER_BY_POPULATION = "ORDER_BY_POPULATION";
export const GET_COUNTRIES_PER_NAME = "GET_COUNTRIES_PER_NAME";
export const GET_ACTIVITIES = "GET_ACTIVITIES";
export const GET_COUNTRY_DETAIL = "GET_COUNTRY_DETAIL";
export const BY_ACTIVITY = "BY_ACTIVITY";
export const LEAST_POPULATION = "LEAST_POPULATION";

// Me traigo los países del back.
export const getCountries = () => {
  return async (dispatch) => {
    const json = await axios.get("/countries");
    return dispatch({
      type: GET_COUNTRIES,
      payload: json.data,
    });
  };
};

export const getCountriesPerName = (search) => {
  //recibo un nombre por payload
  return async (dispatch) => {
    try {
      const json1 = await axios.get(`/countries?name=${search}`); //llamamos a la api pasanadole el nombre que recibo por payload con templates
      return dispatch({
        type: GET_COUNTRIES_PER_NAME,
        payload: json1.data, //json.data es lo que me devuelve el get
      });
    } catch (error) {
      console.log(error);
    }
  };
};

export const getFilteredContinent = (payload) => {
  // Le voy a pasar un payload, que va a ser el value que me va a llegar.
  return {
    type: GET_FILTERED_CONTINENT,
    payload,
  };
};

export const orderByName = (payload) => {
  return {
    type: ORDER_BY_NAME,
    payload,
  };
};

export const orderByPopulation = (payload) => {
  return {
    type: ORDER_BY_POPULATION,
    payload,
  };
};

export const getActivities = () => {
  return async (dispatch) => {
    const activities = await axios.get("/activities");
    return dispatch({ type: GET_ACTIVITIES, payload: activities.data });
  };
};

export const getCountryDetail = (id) => {
  return async (dispatch) => {
    try {
      const json = await axios.get(`/countries/${id}`);
      return dispatch({
        type: GET_COUNTRY_DETAIL,
        payload: json.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
};

export const byActivity = (payload) => {
  return {
    type: BY_ACTIVITY,
    payload,
  };
};

export const leastPopulation = (payload) => {
  return {
    type: LEAST_POPULATION,
    payload,
  };
};
