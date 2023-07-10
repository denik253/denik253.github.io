import { configureStore } from '@reduxjs/toolkit'

// Define the initial state
const initialState = {
    messages: []
};

// Define a reducer function to update the state
function reducer(state = initialState, action) {
    switch (action.type) {
        case "ADD_MESSAGE":
            return {
                ...state,
                messages: [...state.messages, action.payload]
            };
        default:
            return state;
    }
}

// Create the Redux store
const store = configureStore({ reducer: reducer });

export default store;