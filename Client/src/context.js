import {createContext} from "react";

export const StateContext = createContext({
state: {},
dispatch: () => {},
});

//Create a StateContext in a contexts.js file. 
// • In App.js, wrap your components in a <StateContext.Provider> passing values for 
// state and dispatch from your appReducer 
// • In App.js,  CreateTodo, and 
// TodoList components (your component names and structure may be different 
// depending on how you implemented things thus far); instead, utilize the 
// useContext hook within any component which may require access to state or 
// dispatch
//userbar done
