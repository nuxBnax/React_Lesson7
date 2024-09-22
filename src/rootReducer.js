// const initialState = {
//     data: []
// };



// function rootReducer(state = initialState, action) {
//     return ( state );
// }

// export default rootReducer;

//Persist
import { combineReducers } from "@reduxjs/toolkit";
import dataReducer from './dataReducer' // убедитесь что путь правильный

const rootReducer = combineReducers({
    root: (state = {data: []}, action) =>  state, // Это ваш существующих редюсер
    data: dataReducer, //Это ваш новый dataReducer
})
export default rootReducer;