import {combineReducers} from 'redux'

const loadInitalDataReducer = (state = null, action) => {
    switch (action.type) {
        case 'loadInital-Weather-Data':
            return action.payload
        default:
            return state
    }
}

// """""""""""""""""useless"""""""""""""""""
const storeWeatherIconsReducer = (state = [], action) => {
    switch (action.type) {
        case 'store-WeatherIcons-Data':
            return [...state, action.payload]
        case 'CLEANUP_WeatherIcons':
            return []
        default:
            return state
    }
}



const reducers = combineReducers({

    initial_Weather_data: loadInitalDataReducer,

    // """""""""""""""""useless"""""""""""""""""
    WeatherIcons_data:  storeWeatherIconsReducer,


})

export default reducers