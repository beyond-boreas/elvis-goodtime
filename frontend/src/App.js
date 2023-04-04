import "./App.css";
import { useState, useEffect } from "react";
import axios from "axios";
import { io } from "socket.io-client";

// CONTEXTS
import { SocketContext, socket } from "./contexts/SocketContext";

// COMPONENTS
import SubmissionList from "./components/SubmissionList";



function App() {
  const baseURL = "http://localhost:3001";

  // STATE
  const [answer, setAnswer] = useState("test_answer");
  const [submissionData, setSubmissionData] = useState([]);
  const [user, setUser] = useState("test_user");
  const [party, setParty] = useState("test_party");

  useEffect(() => {
    // Get data from database
    const url = baseURL + "/api/submissions";
    const response = axios.get(url);
    response.then((res) => {
      console.log(`DATA:  ${JSON.stringify(res.data)}`);
      setSubmissionData(res.data)
    });


    // Bind socket listener for submission refresh
    socket.on("REFRESH_SUBMISSIONS", () => {
      console.log("REFRESH_SUBMISSIONS recieved");

      const url = baseURL + "/api/submissions";
      const response = axios.get(url);
      response.then((res) => {
        console.log(`DATA:  ${JSON.stringify(res.data)}`);
        setSubmissionData(res.data)
      });
    });
  }, []);

  function handleAnswerSubmit(e) {
    // Prevent the browser from reloading the page
    e.preventDefault();

    // Send a POST to backend with the answer
    const submission = {
      user: user,
      party: party,
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

  function handleLoginChange(e) {
    setUser(e.target.value);
    console.debug(`Username = ${e.target.value}`);
  }

  return (
    <SocketContext.Provider value={socket}>
      <div>Party Code: {party}</div>
      <input type="text" onChange={handleLoginChange}></input>
      <div>Login: </div>
      <input type="text" onChange={handleLoginChange}></input>
      <div className="username">Logged in as: {user}</div>
      <hr />
      <div className="prompt">prompt</div>
      <input type="text" onChange={handleAnswerChange}></input>
      <button onClick={handleAnswerSubmit}>Submit</button>
      <p>answers:</p>
      <SubmissionList submissions={submissionData} />
    </SocketContext.Provider>
  );
}

export default App;
