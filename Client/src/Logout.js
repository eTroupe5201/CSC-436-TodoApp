import {StateContext} from "./context";
import {useContext} from "react";


export default function Logout() { 
  const {state, dispatch} = useContext(StateContext);
 
  
    return (
      <form onSubmit={(e) => {e.preventDefault(); 
      dispatch({type: 'LOGOUT'});
      }}>
         Logged in as: <b>{state.user}</b>
         <input className = "btn" type="submit" value="Logout" />
      </form>
     );
 }