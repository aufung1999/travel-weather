import React from 'react'
import { useDispatch } from 'react-redux'

import { loadGlobalDataAction } from '@/redux/actions/actions'

function ShowWeather_Globe( {day, each} ) {
    const dispatch = useDispatch()
//   console.log('each: ' + JSON.stringify(each))
  dispatch( loadGlobalDataAction(each) )
    return (
    <div>ShowWeather_Globe</div>
  )
}

export default ShowWeather_Globe