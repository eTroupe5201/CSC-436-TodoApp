import Login from './Login';
import Logout from './Logout';
import Register from './Register';
import {StateContext} from "./context";
import {useContext} from "react";


export default function UserBar() {
    const {state} = useContext(StateContext);
    
    
    if (state.user) { 
        return <Logout/> 
    } else {
        return (
            <>
              <Login/>
              <Register  />
            </>
        );
    }
}
// pass prop from parent to child
//use statehook to update the value of user
//useState is a hook, accepts one parameter, parameter passed is default for variable
//useState returns an array with values user and setUser
