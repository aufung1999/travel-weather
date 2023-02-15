import {combineReducers} from 'redux'



const loadInitalDataReducer = (state = null, action) => {
    switch (action.type) {
        case 'loadInital-Weather-Data':
            return action.payload
        default:
            return state
    }
}
//######################################################################################################
const loadGlobalDataReducer = (state = [], action) => {
    switch (action.type) {
        case 'load-Global-Weather-Data':
            return [...state, action.payload]
        default:
            return state
    }
}
//######################################################################################################

const uidReducer = (state = null, action) => {
    switch (action.type) {
        case 'uid':
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
        case 'load-firebase-Data':
            return [...state, ...action.payload]
        case 'store-select-Days-Data':
            return [...state, action.payload]
        case 'CLEANUP_storeSelectDays':
            return []
        default:
            return state
    }
}

//######################################################################################################

const FirebaseandSelectedReducer = (state = {lat: null, lng: null}, action) => {
    switch (action.type) {
        case 'Firebase-and-Selected':
            return action.payload
        default:
            return state
    }
}

//######################################################################################################

const addBtnReducer = (state = false, action) => {
    switch (action.type) {
        case 'addBtn-is-Clicked':
            return !state
        default:
            return state
    }
}

const reducers = combineReducers({

    uid: uidReducer,

    initial_Weather_data: loadInitalDataReducer,

    global_Weather_data: loadGlobalDataReducer,

    // """""""""""""""""useless"""""""""""""""""
    WeatherIcons_data:  storeWeatherIconsReducer,

    addBtn: addBtnReducer,

    selected_days: selectDaysReducer,

    store_selected_days: storeSelectDaysReducer,

    Firebase_Selected_Data: FirebaseandSelectedReducer,



})

export default reducers