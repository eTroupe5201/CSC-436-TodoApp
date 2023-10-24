import Login from './Login';
import Logout from './Logout';
import Register from './Register';


export default function UserBar({user, dispatch}) {
  
    if (user) { 
        return <Logout user={user} dispatch={dispatch} /> 
    } else {
        return (
            <>
              <Login  dispatch={dispatch}/>
              <Register  dispatch={dispatch}/>
            </>
        );
    }
}
// pass prop from parent to child
//use statehook to update the value of user
//useState is a hook, accepts one parameter, parameter passed is default for variable
//useState returns an array with values user and setUser
