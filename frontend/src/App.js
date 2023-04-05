import "./App.css";
import { useState, useEffect } from "react";
import axios from "axios";
import { createBrowserRouter, RouterProvider, useNavigate, Route, Routes } from "react-router-dom";

// CONTEXTS
import { SocketContext, socket } from "./contexts/SocketContext";

// COMPONENTS
import { history } from './_helpers/history';
import SubmissionList from "./components/SubmissionList";
import Home from './pages/Home';
import Room from "./pages/Room";
import TOS from "./pages/TOS";


// SERVICES
import submissionService from "./services/SubmissionService";

function App() {
  const baseURL = "http://localhost:3001";
  const navigate = useNavigate();
  // STATE

  const [answer, setAnswer] = useState("test_answer");
  const [submissionData, setSubmissionData] = useState([]);
  const [username, setUsername] = useState("_USERNAME");
  const [roomcode, setRoomcode] = useState("_ROOMCODE");

  function handleJoinRoom(joinObject) {
    // TODO:  CHECK IF ROOM EXISTS AND USERNAME NOT TAKEN BEFORE SET STATE & NAV
    setUsername(joinObject.username)
    setRoomcode(joinObject.roomcode)
    console.debug(`Request to join room ${joinObject.roomcode} from ${joinObject.username}`);
    navigate('/room')
  }

  // useEffect(() => {
  //   // Retrieve the initial responses
  //   const subData = submissionService.getAll();
  //   subData.then((data) => {
  //     console.log(`DATA:  ${JSON.stringify(data)}`);
  //     setSubmissionData(data);
  //   });

  //   // Bind socket listener for submission refresh
  //   socket.on("REFRESH_SUBMISSIONS", () => {
  //     console.log("REFRESH_SUBMISSIONS recieved");

  //     const url = baseURL + "/api/submissions";
  //     const response = axios.get(url);
  //     response.then((res) => {
  //       console.log(`DATA:  ${JSON.stringify(res.data)}`);
  //       setSubmissionData(res.data);
  //     });
  //   });
  // }, []);

  // function handleAnswerSubmit(e) {
  //   // Prevent the browser from reloading the page
  //   e.preventDefault();

  //   // Send a POST to backend with the answer
  //   const submission = {
  //     user: user,
  //     party: party,
  //     content: answer,
  //   };

  //   console.debug(`Sending ${JSON.stringify(submission)} to backend.`);
  //   const url = baseURL + "/api/submissions";

  //   axios.post(url, submission);
  // }

  // function handleAnswerChange(e) {
  //   setAnswer(e.target.value);
  //   console.debug(`Answer = ${e.target.value}`);
  // }

  // function handleLoginChange(e) {
  //   setUser(e.target.value);
  //   console.debug(`Username = ${e.target.value}`);
  // }

  // return (
  //   <SocketContext.Provider value={socket}>
  //     <div>Party Code: {party}</div>
  //     <input type="text" onChange={handleLoginChange}></input>
  //     <div>Login: </div>
  //     <input type="text" onChange={handleLoginChange}></input>
  //     <div className="username">Logged in as: {user}</div>
  //     <hr />
  //     <div className="prompt">prompt</div>
  //     <input type="text" onChange={handleAnswerChange}></input>
  //     <button onClick={handleAnswerSubmit}>Submit</button>
  //     <p>answers:</p>
  //     <SubmissionList submissions={submissionData} />
  //   </SocketContext.Provider>
  // );


  return(
    <div>
      <Routes>
        <Route exact path="/" element={<Home handleJoinRoom={(code, username) => handleJoinRoom(code, username)} />}/>
        <Route exact path="/room" element={<Room username={username} roomcode={roomcode}/>}/>
        <Route exact path="/TOS" element={<TOS/>}/>
      </Routes>
    </div>
  )
}

export default App;
