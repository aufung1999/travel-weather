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

//############################################################################################################################################################

const selectDaysReducer = (state = [], action) => {
    switch (action.type) {
        case 'select-Days-Data':
            return [...state, action.payload]
        case 'CLEANUP_selectDays':
            return []
        default:
            return state
    }
}

//############################################################################################################################################################

const storeSelectDaysReducer = (state = [], action) => {
    switch (action.type) {
        case 'store-select-Days-Data':
            return [...state, action.payload]
        case 'CLEANUP_storeSelectDays':
            return []
        default:
            return state
    }
}

const reducers = combineReducers({

    initial_Weather_data: loadInitalDataReducer,

    // """""""""""""""""useless"""""""""""""""""
    WeatherIcons_data:  storeWeatherIconsReducer,

    selected_days: selectDaysReducer,

    store_selected_days: storeSelectDaysReducer,


})

export default reducers