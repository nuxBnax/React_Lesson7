import React from 'react';
import { useDispatch } from 'react-redux';


function MyButton() {
    const dispatch = useDispatch();

    const handleClick =() => {
        dispatch({ type: 'BUTTON_CLICKED', payload: "Hello, World"})
    }
    return <button onClick={handleClick}>Click me!</button>;
}

export default MyButton;