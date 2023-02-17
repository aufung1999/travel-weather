import moment from "moment";

export const loadInitalDataAction = () => {
  // Thunk Function
  return async (dispatch, getState) => {
    // Fetching results from an API : asynchronous action
    const response = await fetch(
      "http://api.openweathermap.org/data/2.5/forecast?lat=42.985900&lon=-81.294700&appid=6e0f30fd9824b943d84e28b935ec6e4d&units=metric&cnt=40"
    );
    const data = await response.json();

    dispatch({
      type: "loadInital-Weather-Data",
      payload: data,
    });
  };
};

//###################################################################################

export const loadGlobalDataAction = (each) => {
  // Thunk Function
  return async (dispatch, getState) => {

    // console.log('each: ' + JSON.stringify(each))

    Promise.all(each.map(async (each_location) =>{

        let lat = each_location["LL"]["lat"]
        let lng = each_location["LL"]["lng"]

        let start_date = moment(each_location["validate_date"][0]*1000).format("YYYY-MM-DD")
        let end_date = moment(each_location["validate_date"].at(-1)*1000).format("YYYY-MM-DD")

        // console.log('lat,lng,start_date,end_date: ' + lat,lng,start_date,end_date)

        fetch(
          `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lng}&daily=weathercode,temperature_2m_max,temperature_2m_min&current_weather=true&timezone=auto&start_date=${start_date}&end_date=${end_date}`
        )
        .then(res => res.json())
        .then( data =>
          // console.log('data: ' + JSON.stringify(data), each_location)
          dispatch({
          type: "load-Global-Weather-Data",
          payload: {target_data: data, destination: each_location},
          })
        )

      })
    )

  };
};

//###################################################################################

export const loadTodosAction = (data) => {
  return {
    type: "load-Todos-Data",
    payload: data
  };
};

//###################################################################################

export const UIDAction = (data) => {
  return {
    type: "uid",
    payload: data
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
      "https://maps.googleapis.com/maps/api/geocode/json?address=" +
      validate["inputValue_address"] +
        "&key=AIzaSyAd-XY8yOLjTAtz4HVUjmpvvrjZy5HICJA"
    );
    const data = await response.json();
    let { lat, lng } = data["results"][0]["geometry"]["location"];
    console.log(lat, lng);

    const validate_object = {...validate, LL: {lat : lat, lng: lng}}

    dispatch({
      type: "store-select-Days-Data",
      payload: validate_object,
    });
  };
};

export const loadFirebaseDataAction = (data) => ({
  type: "load-firebase-Data",
  payload: data
});

//###################################################################################

export const FirebaseandSelectedAction = (data) => {
  return async (dispatch, getState) => {
    console.log('data: ' + data)
    dispatch({
      type: "Firebase-and-Selected",
      payload: data,
    });
  };
};