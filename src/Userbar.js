import Login from './Login';
import Logout from './Logout';
import Register from './Register';


export default function UserBar({user, setUser}) {
  
    if (user) { 
        return <Logout user={user} setUser={setUser} /> 
    } else {
        return (
            <>
              <p className="login"><Login  setUser={setUser} /></p>
              <p className="register"><Register  setUser={setUser}/></p>
            </>
        );
    }
}
// pass prop from parent to child
//use statehook to update the value of user
//useState is a hook, accepts one parameter, parameter passed is default for variable
//useState returns an array with values user and setUser
