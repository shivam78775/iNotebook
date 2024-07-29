import './App.css';
import {
  BrowserRouter as Router,
  Route,
  Routes
} from "react-router-dom";
import Navbar from './Components/Navbar';
import { Home } from './Components/Home';
import About from './Components/About';
import NoteState from './Context/Notes/noteState';
import Alert from './Components/Alert';
import Login from './Components/Login';
import Signup from './Components/Signup';
import { useState } from 'react';

function App() {
  const [alert, setAlert] = useState("null");

  const showAlert = (message, type) => {
    

    setAlert({
      msg: message,
      type: type
    })
    setTimeout(() => {
      setAlert(null);
    }, 3000);
  }


  return (
    <>
      <NoteState>
        <Router>
          <Navbar showAlert={showAlert}/>
          <Alert alert={alert} />
          <div className="container">
            <Routes>
              <Route exact index path="/" element={<Home showAlert={showAlert} />}></Route>
              <Route exact index path="/about" element={<About />}></Route>
              <Route exact index path="/login" element={<Login showAlert={showAlert}/>}></Route>
              <Route exact index path="/signup" element={<Signup showAlert={showAlert}/>}></Route>
            </Routes>
          </div>
        </Router>
      </NoteState>
    </>
  );
}

export default App;
