import React from 'react'

import moment from 'moment';

import { useDispatch, useSelector } from 'react-redux'

import { loadGlobalDataAction } from '@/redux/actions/actions'
import { code_pic } from '../reuseFunctions/code_pic';

function ShowWeather_Globe( {day, each} ) {

    const global_Weather_data = useSelector((state) => state.global_Weather_data);

    return (
    <div>
        {/* {console.log('day: ' + day.format("YYYY-MM-DD"))} */}
        {global_Weather_data?.map(each_location =>
                // console.log('each_location["target_data"]["daily"]: ' + JSON.stringify(each_location["target_data"]["daily"]["time"]))
                each_location["target_data"]["daily"]["time"].map((time, index) =>
                    time == day.format("YYYY-MM-DD") && each_location["destination"]["inputValue_address"] == each["inputValue_address"]?
                    <div className='row border ' key={"ShowWeather_Globe-" + day.format("YYYY-MM-DD")}>
                        <div>{each_location["target_data"]["daily"]["temperature_2m_max"][index]}</div>
                        <div>{code_pic(each_location["target_data"]["daily"]["weathercode"][index])}</div>
                    </div> : null
                )

            )
        }
    </div>
  )
}

export default ShowWeather_Globe