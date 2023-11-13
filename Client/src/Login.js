import { useState, useEffect,useContext } from "react";
import {StateContext} from "./context";

import {useResource} from "react-request-hook";

export default function Login() {
  const { dispatch} = useContext(StateContext);
  const [loginFailed, setLoginFailed] = useState(false);
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");

  function handleUsername(evt) {
    setUsername(evt.target.value);
  }
  function handlePassword(evt) {
    setPassword(evt.target.value);
  }

 
  const [user, login] = useResource((username, password) => ({
    url: "/login",
    method: "post",
    data: { email: username, password },
  }));

  useEffect(() => {
    if (user?.data?.user) {
      setLoginFailed(false);
      dispatch({ type: "LOGIN", username: user.data.user.email });
    } 
    if(user?.error){ //if error set login failed. fixes glitch
      setLoginFailed(true);
    }
}, [user]);

  return (
    <>
    {loginFailed && (
      <span style={{ color: "red" }}>Invalid username or password</span>
    )}
    <form
      onSubmit={(e) => {
        e.preventDefault();
        login(username, password);
        // setUser(username);
      //  dispatch({ type: "LOGIN", username});
      }}
    >
      <label htmlFor="login-username">Username:</label>
      <input
        type="text"
        name="login-username"
        id="login-username"
        value={username}
        onChange={handleUsername}
      />
      <label htmlFor="login-password">Password:</label>
      <input type="password" name="login-password" id="login-password"onChange={handlePassword} />
      <input  className="btn" type="submit" value="Login" disabled={username.length === 0} />
    </form>
    </>
  );
}
