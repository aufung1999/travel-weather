export const loadInitalDataAction = () => {

    // Thunk Function
    return async (dispatch,getState)=>{
        // Fetching results from an API : asynchronous action
        const response = await fetch(
            'http://api.openweathermap.org/data/2.5/forecast?lat=42.985900&lon=-81.294700&appid=6e0f30fd9824b943d84e28b935ec6e4d&units=metric&cnt=40');
        const data = await response.json();

        dispatch({
            type : 'loadInital-Weather-Data',
            payload : data
        });
    }
}

//###################################################################################

// """""""""""""""""useless"""""""""""""""""
export const storeWeatherIconsAction = ( Weather_Icons ) => {
    return async (dispatch,getState)=>{
        console.log('Weather_Icons: ' + Weather_Icons)
        // const response = await fetch(
        //     'http://api.openweathermap.org/data/2.5/forecast?lat=42.985900&lon=-81.294700&appid=6e0f30fd9824b943d84e28b935ec6e4d&units=metric&cnt=40');
        const data = Weather_Icons

        dispatch({
            type : 'store-WeatherIcons-Data',
            payload : data
        });
    }
}

export const cleanupWeatherIconsAction = () => {
    return{
        type: 'CLEANUP_WeatherIcons',
    };
};

//###################################################################################

export const selectDaysAction = ( selectDay ) => {

    return async (dispatch,getState)=>{

        dispatch({
                type : 'select-Days-Data',
                payload : selectDay
            });

    }
}

//###################################################################################

export const storeSelectDaysAction = ( validate ) => {

    return async (dispatch,getState)=>{

        dispatch({
                type : 'store-select-Days-Data',
                payload : validate
            });

    }
}
