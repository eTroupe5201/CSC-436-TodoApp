import { useState } from "react";

export default function Login({ dispatch }) {
  const [username, setUsername] = useState("");

  function handleUsername(evt) {
    setUsername(evt.target.value);
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        // setUser(username);
        dispatch({ type: "LOGIN", username});
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
      <input type="password" name="login-password" id="login-password" />
      <input  className="btn" type="submit" value="Login" disabled={username.length === 0} />
    </form>
  );
}
