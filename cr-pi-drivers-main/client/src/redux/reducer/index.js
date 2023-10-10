import { GET_DRIVERS, CLEAR_DRIVERS_DETAIL, GET_BY_NAME, GET_TEAMS, SET_TEAM_FILTER, SET_SOURCE_FILTER, SET_NAME_ORDER, SET_BIRTHDATE_ORDER} from "../actions";
import { filterDriversByTeam, sortDriversByBirthdate,sortDriversByName } from "../utils/utils";

let initialState = {
  allDrivers: [],
  driverCopy: [],
  posts: [],
  teams: [],
  teamFilter: null,
  sourceFilter: null
};

const rootReducer = (state = initialState, action) => {
  switch(action.type) {
    case GET_DRIVERS:
      return {
        ...state,
        allDrivers: action.payload,
        driverCopy: action.payload
      };

    case CLEAR_DRIVERS_DETAIL:
      return {
        ...state,
        allDrivers: []
      };

    case GET_BY_NAME:
      return {
        ...state,
        allDrivers: action.payload
      };
    
    case GET_TEAMS:
      return {
        ...state,
        teams: action.payload
      };

      case SET_TEAM_FILTER: {
        let filteredDrivers = filterDriversByTeam(state.driverCopy, action.payload);
        filteredDrivers = sortDriversByName(filteredDrivers, state.nameOrder);
        filteredDrivers = sortDriversByBirthdate(filteredDrivers, state.birthdateOrder);
    
        return {
            ...state,
            allDrivers: filteredDrivers,
            teamFilter: action.payload
        };
    }

    case SET_SOURCE_FILTER:{
            let filteredSourceDrivers;
            if (action.payload === "database") {
                filteredSourceDrivers = state.driverCopy.filter(driver => driver.created);
            } else if (action.payload === "api") {
                filteredSourceDrivers = state.driverCopy.filter(driver => !driver.created);
            } else {
                filteredSourceDrivers = state.driverCopy;
            }
            return {
                ...state,
                allDrivers: filteredSourceDrivers,
                sourceFilter: action.payload
            };
            }

            case SET_NAME_ORDER: {
              let sortedDrivers = sortDriversByName(state.allDrivers, action.payload);
              sortedDrivers = sortDriversByBirthdate(sortedDrivers, state.birthdateOrder);
          
              return {
                  ...state,
                  allDrivers: sortedDrivers,
                  nameOrder: action.payload
              };
          }
            
          case SET_BIRTHDATE_ORDER: {
            let sortedDrivers;
            if (action.payload === "") {
                sortedDrivers = [...state.driverCopy];
            } else {
                sortedDrivers = sortDriversByName(state.allDrivers, state.nameOrder);
                sortedDrivers = sortDriversByBirthdate(sortedDrivers, action.payload);
            }
        
            return {
                ...state,
                allDrivers: sortedDrivers,
                birthdateOrder: action.payload
            };
        }

    default:
      return state;
  }
}

export default rootReducer;
