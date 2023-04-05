import React from "react";
import { useState, useEffect } from "react";

function Home({ handleJoinRoom, handleCreateRoom }) {
  const [roomcode, setRoomcode] = useState(undefined);
  const [username, setUsername] = useState(undefined);

  function _handleJoinRoom(event) {
    event.preventDefault();
    if (!roomcode) {
      console.debug(`No roomcode specified!`);
      return;
    }
    if (!username) {
      console.debug(`No username specified!`);
      return;
    }
    
    const joinObject = {
      roomcode: roomcode,
      username: username,
    };
    handleJoinRoom(joinObject);
  }

  function _handleRoomcodeChange(event) {
    setRoomcode(event.target.value);
  }

  function _handleUsernameChange(event) {
    setUsername(event.target.value);
  }

  return (
    <div className="form">
      <div className="constrain">
        <form
          className="login-form"
          autoComplete="off"
          onSubmit={(event) => _handleJoinRoom(event)}
        >
          <fieldset>
            <label htmlFor="code">ROOM CODE</label>
            <input
              name="code"
              placeholder="Enter 4-letter code"
              onChange={(event) => _handleRoomcodeChange(event)}
            ></input>
            <label htmlFor="username">
              NAME
              <span className="remaining">12</span>
            </label>
            <input
              name="username"
              placeholder="Enter your name"
              maxLength="12"
              onChange={(event) => _handleUsernameChange(event)}
            ></input>
            <button className="button-play">PLAY</button>
            <p className="tos">
              By clicking Play, you agree to our{" "}
              <a href="/tos">Terms of Service</a>
            </p>
            <div className="separator">OR</div>
            <button className="button-create">CREATE</button>
          </fieldset>
        </form>
      </div>
    </div>
  );
}

export default Home;
