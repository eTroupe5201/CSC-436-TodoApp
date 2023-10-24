export default function Logout({user, dispatch}) { 
    return (
      <form onSubmit={(e) => {e.preventDefault(); 
      dispatch({type: 'LOGOUT'});
      }}>
         Logged in as: <b>{user}</b>
         <input className = "btn" type="submit" value="Logout" />
      </form>
     );
 }
 