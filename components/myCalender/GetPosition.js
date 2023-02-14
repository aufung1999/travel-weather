import { LLAction } from '@/redux/actions/actions';
import React, { useState } from 'react'
import { useDispatch } from 'react-redux';

function GetPosition() {

    const dispatch = useDispatch()

    const [inputValue, setInputValue] = useState('')

    function receiveValue(e){
        e.preventDefault()
        console.log('Clicked ' + inputValue);

        dispatch( LLAction(inputValue)    )
    }

    return (
        <div>
            <form onSubmit={receiveValue}>

                <input type='text' value = {inputValue} onChange={(e) => setInputValue(e.target.value)}></input>

                <input type="submit" value="Submit"></input>

            </form>
        </div>
    )
};

export default GetPosition