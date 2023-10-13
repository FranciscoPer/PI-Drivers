import axios from "axios"

export const GET_DRIVERS = "GET_DRIVERS";
export const GET_BY_NAME = "GET_BY_NAME";
export const CLEAR_DRIVERS_DETAIL = 'CLEAR_DRIVERS_DETAIL';
export const GET_TEAMS = "GET_TEAMS"
export const SET_TEAM_FILTER = "SET_TEAM_FILTER";
export const SET_SOURCE_FILTER = "SET_SOURCE_FILTER";
export const SET_NAME_ORDER = "SET_NAME_ORDER";
export const SET_BIRTHDATE_ORDER = "SET_BIRTHDATE_ORDER";



export const getDrivers = () => {
    return async function(dispatch) {
        try {
            const response = await axios.get("http://localhost:3001/drivers");  
            dispatch({
                type: GET_DRIVERS,
                payload: response.data,
            });
        } catch (error) {
            console.error("Hubo un error al obtener los datos: ", error);
            
        }
    };
};
export const getTeams = () => {
    return async function(dispatch) {
        try {
            const response = await axios.get("http://localhost:3001/teams");
            dispatch({
                type: GET_TEAMS,
                payload: response.data,
            });
        } catch (error) {
            console.error("Error al obtener los equipos: ", error);
        }
    };
};

export const setTeamFilter = (team) => ({
    type: SET_TEAM_FILTER,
    payload: team
});




export const clearDriversDetail = () => {
  return {
    type: CLEAR_DRIVERS_DETAIL
  };
};



export const getDriversByName = (name) => {
    return async function(dispatch) {
        try {
            const response = await axios.get(`http://localhost:3001/?name=${name}`);  
            dispatch({
                type: GET_BY_NAME,
                payload: response.data,
            });
        } catch (error) {
            console.error("Hubo un error al obtener los datos: ", error);
            window.alert('No hay drivers con ese Name.');
            
        }
    };
};


export const setSourceFilter = (source) => {
    return {
        type: SET_SOURCE_FILTER,
        payload: source
    };
};


export const setNameOrder = (order) => {
    return {
        type: SET_NAME_ORDER,
        payload: order
    };
};


export const setBirthdateOrder = (order) => {
    return {
        type: SET_BIRTHDATE_ORDER,
        payload: order
    };
};
