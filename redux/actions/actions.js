import moment from "moment";
import * as uuid from "uuid";

export const loadInitalDataAction = () => {
  // Thunk Function
  return async (dispatch, getState) => {
    // Fetching results from an API : asynchronous action
    const response = await fetch(
      "https://api.openweathermap.org/data/2.5/forecast?lat=42.985900&lon=-81.294700&appid=6e0f30fd9824b943d84e28b935ec6e4d&units=metric&cnt=40"
    );
    const data = await response.json();

    dispatch({
      type: "loadInital-Weather-Data",
      payload: data,
    });
  };
};

//###################################################################################

export const loadGlobalDataAction = (each_location) => {
  // Thunk Function
  return async (dispatch, getState) => {
    let lat = each_location["LL"]["lat"];
    let lng = each_location["LL"]["lng"];

    let start_date = moment(each_location["validate_date"][0]).format(
      "YYYY-MM-DD"
    );
    let end_date = moment(each_location["validate_date"].at(-1)).format(
      "YYYY-MM-DD"
    );

    // console.log('lat,lng,start_date,end_date: ' + lat,lng,start_date,end_date)

    fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lng}&daily=weathercode,temperature_2m_max,temperature_2m_min&current_weather=true&timezone=auto&start_date=${start_date}&end_date=${end_date}`
    )
      .then((res) => res.json())
      .then((data) =>
        dispatch({
          type: "load-Global-Weather-Data",
          payload: { target_data: data, destination: each_location },
        })
      );
  };
};

export const cleanupGlobalWeatherDataAction = () => {
  return {
    type: "CLEANUP_GlobalWeather",
  };
};

//###################################################################################

export const loadTodosAction = (data) => {
  return {
    type: "load-Todos-Data",
    payload: data,
  };
};

//###################################################################################

export const UIDAction = (data) => {
  return {
    type: "uid",
    payload: data,
  };
};

// """""""""""""""""useless"""""""""""""""""
export const storeWeatherIconsAction = (Weather_Icons) => {
  return async (dispatch, getState) => {
    console.log("Weather_Icons: " + Weather_Icons);
    // const response = await fetch(
    //     'http://api.openweathermap.org/data/2.5/forecast?lat=42.985900&lon=-81.294700&appid=6e0f30fd9824b943d84e28b935ec6e4d&units=metric&cnt=40');
    const data = Weather_Icons;

    dispatch({
      type: "store-WeatherIcons-Data",
      payload: data,
    });
  };
};

//

export const cleanupWeatherIconsAction = () => {
  return {
    type: "CLEANUP_WeatherIcons",
  };
};

//###################################################################################

export const addBtnAction = () => ({
  type: "addBtn-is-Clicked",
});

//###################################################################################

export const selectDaysAction = (selectDay) => {
  return async (dispatch, getState) => {
    dispatch({
      type: "select-Days-Data",
      payload: selectDay,
    });
  };
};

//###################################################################################

export const storeSelectDaysAction = (validate) => {
  return async (dispatch, getState) => {
    console.log("validate: " + JSON.stringify(validate));

    const response = await fetch(
      `http://api.positionstack.com/v1/forward?access_key=196a0b503b2b5f3fcdc09f9c31b3ffce&query=${validate["inputValue_address"]}`
    );
    const data = await response.json();
    let lat = data["data"][0]["latitude"];
    let lng = data["data"][0]["longitude"];
    console.log(lat, lng);

    const validate_object = {
      ...validate,
      LL: { lat: lat, lng: lng },
      ID: uuid.v4(),
    };

    dispatch({
      type: "store-select-Days-Data",
      payload: validate_object,
    });
  };
};

export const loadFirebaseDataAction = (data) => ({
  type: "load-firebase-Data",
  payload: data,
});

//###################################################################################

export const FirebaseandSelectedAction = (data) => {
  return async (dispatch, getState) => {
    console.log("data: " + data);
    dispatch({
      type: "Firebase-and-Selected",
      payload: data,
    });
  };
};

//###################################################################################

export const ShowEventsThresholdReducer = (data) => ({
  type: "DateLayout_Switched",
  payload: data,
});

//###################################################################################

export const store_CountryCodeAction = (each) => {
  return async (dispatch, getState) => {
    console.log("address: " + each);

    let countryCode;

    const response = await fetch(
      `http://api.positionstack.com/v1/reverse?access_key=196a0b503b2b5f3fcdc09f9c31b3ffce&query=${each["target_data"]["latitude"]},${each["target_data"]["longitude"]}`
    );
    const data = await response.json();

    countryCode = [
      each["destination"]["inputValue_address"],
      data["data"][0]["country_code"].substring(0, 2),
    ];

    dispatch({
      type: "store-country-code",
      payload: countryCode,
    });
  };
};
