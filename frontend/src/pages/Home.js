import React from "react";
import { useState, useEffect } from "react";

function Home({ handleJoinRoom, handleCreateRoom }) {
  const [roomcode, setRoomcode] = useState(undefined);
  const [username, setUsername] = useState(undefined);
  const maxNameLength = 12;

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
    const allowed = /^[A-Za-z]+$/; // REGEX for letters A-Z
    const text = event.target.value;

    if (text.match(allowed)) {
      setRoomcode(event.target.value);
      return;
    }

    event.target.value = text.slice(0, -1);
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
          spellCheck="off"
          onSubmit={(event) => _handleJoinRoom(event)}
        >
          <fieldset>
            <label htmlFor="code">ROOM CODE</label>
            <input
              name="code"
              placeholder="Enter 4-letter code"
              maxLength="4"
              onChange={(event) => _handleRoomcodeChange(event)}
            ></input>
            <label htmlFor="username">
              NAME
              <span className="remaining">
                {!username ? "12" : maxNameLength - username.length}
              </span>
            </label>
            <input
              name="username"
              placeholder="Enter your name"
              maxLength={maxNameLength.toString()}
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
