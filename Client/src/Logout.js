import {StateContext} from "./context";
import {useContext} from "react";


export default function Logout() { 
  const {state, dispatch} = useContext(StateContext);
  const user = state.user;
  
    return (
      <form onSubmit={(e) => {e.preventDefault(); 
      dispatch({type: 'LOGOUT'});
      }}>
         Logged in as: <b>{user.username}</b>
         <input className = "btn" type="submit" value="Logout" />
      </form>
     );
 }