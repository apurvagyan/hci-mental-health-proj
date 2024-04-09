import './App.css';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import help from './images/help-icon.png'
import Home from './pages/Home';
import Q1 from './pages/Q1';
import Q2 from './pages/Q2';
import YC3 from './pages/YC3';
import YaleHealth from './pages/YaleHealth';
import CentralizedResources from './pages/CentralizedResources';
import Final from './pages/Final';

import $ from 'jquery';

// set up host for becton center tv
var host = "cpsc484-02.stdusr.yale.internal:8888";

// call start method to run frames
$(document).ready(function () {
    frames.start();
});

// define frames for program execution
var frames = {
    socket: null,

    start: function () {
        var url = "ws://" + host + "/frames";
        frames.socket = new WebSocket(url);
        frames.socket.onmessage = function (event) {
            frames.show(JSON.parse(event.data));
        }
    },

    show: function (frame) {
        console.log(frame);
    }
};


function App() {
  return (
    <Router>
      <div>
        <li><Link to="/home">Home</Link></li>
        <li><Link to="/Q1">Question 1</Link></li>
        <li><Link to="/Q2">Question 2</Link></li>
        <li><Link to="/YC3">YC3 Counseling</Link></li>
        <li><Link to="/YaleHealth">Yale Health Counseling</Link></li>
        <li><Link to="/CentralizedResources">Centralized Resources</Link></li>
        <li><Link to="/final">Final</Link></li>
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/Q1" element={<Q1 />} />
          <Route path="/Q2" element={<Q2 />} />
          <Route path="/YC3" element={<YC3 />} />
          <Route path="/YaleHealth" element={<YaleHealth />} />
          <Route path="/CentralizedResources" element={<CentralizedResources />} />
          <Route path="/final" element={<Final />} />
          {/* Add more routes here */}
        </Routes>
      </div>
      <div>
        <img src={help} class='help-icon' alt="question mark enclosed within a circle"></img>
        <p class='help-text'>raise both hands for help!</p>
      </div>
    </Router>
  );
};

export default App;

