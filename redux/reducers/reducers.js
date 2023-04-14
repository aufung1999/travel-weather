import { compareObjs } from "@/components/reuseFunctions/compareObjs";
import { combineReducers } from "redux";

const loadInitalDataReducer = (state = null, action) => {
  switch (action.type) {
    case "loadInital-Weather-Data":
      return action.payload;
    default:
      return state;
  }
};

const refreshBtnReducer = (state = false, action) => {
  switch (action.type) {
    case "Refresh-is-Clicked":
      return !state;
    default:
      return state;
  }
};

//######################################################################################################
const loadGlobalDataReducer = (state = [], action) => {
  switch (action.type) {
    case "load-Global-Weather-Data":
      let bool_l;

      bool_l = state.some(
        (each) =>
          each["destination"]["inputValue_address"] ==
            action.payload["destination"]["inputValue_address"] &&
          each["destination"]["validate_date"][0] ==
            action.payload["destination"]["validate_date"][0] &&
          each["destination"]["validate_date"].at(-1) ==
            action.payload["destination"]["validate_date"].at(-1)
      );
      console.log("bool_l: " + bool_l);
      return bool_l ? state : [...state, action.payload];

    case "delete-Global-Weather-Data":
      const filtered_state = state.filter(
        (each) =>
          each["destination"]["ID"] !== action.payload["destination"]["ID"]
      );
      return filtered_state;

    case "CLEANUP_GlobalWeather":
      return [];
    default:
      return state;
  }
};
//######################################################################################################
const loadTodosReducer = (state = [], action) => {
  switch (action.type) {
    case "load-Todos-Data":
      return [...state, action.payload];
    default:
      return state;
  }
};

//######################################################################################################

const uidReducer = (state = null, action) => {
  switch (action.type) {
    case "uid":
      return action.payload;
    default:
      return state;
  }
};

// """""""""""""""""useless"""""""""""""""""
const storeWeatherIconsReducer = (state = [], action) => {
  switch (action.type) {
    case "store-WeatherIcons-Data":
      return [...state, action.payload];
    case "CLEANUP_WeatherIcons":
      return [];
    default:
      return state;
  }
};

//############################################################################################################################################################

const selectDaysReducer = (state = [], action) => {
  switch (action.type) {
    case "select-Days-Data":
      return [...state, action.payload];
    case "CLEANUP_selectDays":
      return [];
    default:
      return state;
  }
};

//############################################################################################################################################################

const storeSelectDaysReducer = (state = [], action) => {
  switch (action.type) {
    case "load-firebase-Data":
      return [...state, ...action.payload];
    case "store-select-Days-Data":
      return [...state, action.payload];
    case "CLEANUP_storeSelectDays":
      return [];
    default:
      return state;
  }
};

//######################################################################################################

const FirebaseandSelectedReducer = (
  state = { lat: null, lng: null },
  action
) => {
  switch (action.type) {
    case "Firebase-and-Selected":
      return action.payload;
    default:
      return state;
  }
};

//######################################################################################################

const addBtnReducer = (state = false, action) => {
  switch (action.type) {
    case "addBtn-is-Clicked":
      return !state;
    default:
      return state;
  }
};

//######################################################################################################

const ShowEventsThresholdReducer = (state = null, action) => {
  switch (action.type) {
    case "DateLayout_Switched":
      console.log("action.payload: " + action.payload);
      return action.payload;
    default:
      return state;
  }
};

//######################################################################################################

const reducers = combineReducers({
  uid: uidReducer,

  refreshBtn: refreshBtnReducer,
  initial_Weather_data: loadInitalDataReducer,

  ShowEvents_threshold_data: ShowEventsThresholdReducer,

  global_Weather_data: loadGlobalDataReducer,

  todo_data: loadTodosReducer,

  // """""""""""""""""useless"""""""""""""""""
  WeatherIcons_data: storeWeatherIconsReducer,

  addBtn: addBtnReducer,

  selected_days: selectDaysReducer,

  store_selected_days: storeSelectDaysReducer,

  Firebase_Selected_Data: FirebaseandSelectedReducer,
});

export default reducers;
