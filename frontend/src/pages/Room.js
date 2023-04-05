import React from 'react';
import { useState, useEffect } from "react";
import axios from "axios";

// CONTEXTS
import { SocketContext, socket } from "../contexts/SocketContext";

// COMPONENTS
import SubmissionList from "../components/SubmissionList";

// SERVICES
import submissionService from "../services/SubmissionService";

function Room({ roomcode, username }) {
    const baseURL = "http://localhost:3001";
    const [answer, setAnswer] = useState("test_answer");
    const [submissionData, setSubmissionData] = useState([]);

  useEffect(() => {
    // Retrieve the initial responses
    const subData = submissionService.getAll();
    subData.then((data) => {
      console.log(`DATA:  ${JSON.stringify(data)}`);
      setSubmissionData(data);
    });

    // Bind socket listener for submission refresh
    socket.on("REFRESH_SUBMISSIONS", () => {
      console.log("REFRESH_SUBMISSIONS recieved");

      const url = baseURL + "/api/submissions";
      const response = axios.get(url);
      response.then((res) => {
        console.log(`DATA:  ${JSON.stringify(res.data)}`);
        setSubmissionData(res.data);
      });
    });
  }, []);

  function handleAnswerSubmit(e) {
    // Prevent the browser from reloading the page
    e.preventDefault();

    // Send a POST to backend with the answer
    const submission = {
      user: username,
      party: roomcode,
      content: answer,
    };

    console.debug(`Sending ${JSON.stringify(submission)} to backend.`);
    const url = baseURL + "/api/submissions";

    axios.post(url, submission);
  }

  function handleAnswerChange(e) {
    setAnswer(e.target.value);
    console.debug(`Answer = ${e.target.value}`);
  }

  return (
    <SocketContext.Provider value={socket}>
      <div>Party Code: {roomcode}</div>
      <div className="username">Logged in as: {username}</div>
      <hr />
      <div className="prompt">prompt</div>
      <input type="text" onChange={handleAnswerChange}></input>
      <button onClick={handleAnswerSubmit}>Submit</button>
      <p>answers:</p>
      <SubmissionList submissions={submissionData} />
    </SocketContext.Provider>
  );
    // return(
    //     <div>Welcome to {roomcode}, {username}!</div>
    // )
}

export default Room;