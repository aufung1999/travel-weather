import {combineReducers} from 'redux'

const loadInitalDataReducer = (state = null, action) => {
    switch (action.type) {
        case 'loadInital-Weather-Data':
            return action.payload
        default:
            return state
    }
}

const reducers = combineReducers({

    initial_weather_data: loadInitalDataReducer

})

export default reducers