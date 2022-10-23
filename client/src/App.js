import logo from "./logo.svg";
import "./App.css";
import { useEffect, useState } from "react";
import jwt_decode from "jwt-decode";

function App() {
  const [user, setUser] = useState({});
  function handleCallbackResponse(response) {
    console.log(`there will be an encoded JWT token i guess and this is it ${response.credential}`);
    var userObj = jwt_decode(response.credential);
    console.log(userObj);
    setUser(userObj);
    document.getElementById("signInDiv").hidden = true;
  }

  function handleSignOut(event) {
    setUser({});
    document.getElementById("signInDiv").hidden = false;
  }

  useEffect(() => {
    /* global google */
    google.accounts.id.initialize({
      client_id:
        "880019132334-5q1n8crc19h8fn9luukc0ksc2kgvmt8j.apps.googleusercontent.com",
      callback: handleCallbackResponse,
    });

    google.accounts.id.renderButton(document.getElementById("signInDiv"), {
      theme: "outline",
      size: "large",
    });
    google.accounts.id.prompt()
  }, []);

  return (
    <div className="App">
      <div id="signInDiv"> </div>
      {Object.keys(user).length != 0 && (
        <button onClick={(e) => handleSignOut(e)}> Sign Out </button>
      )}
      {user && (
        <div>
          <img src={user.picture}></img>
          <h3>{user.name}</h3>
        </div>
      )}
    </div>
  );
}

export default App;
