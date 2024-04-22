import './App.css';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';

import Home from './pages/Home';
import Instructions from './pages/instructions';
import Q1 from './pages/questions/Q1';
import Q2 from './pages/questions/Q2';
import Q3 from './pages/questions/Q3';
import Q4 from './pages/questions/Q4';
import GLC from './pages/recommendations/GLC';
import Walden from './pages/recommendations/Walden';
import YC3 from './pages/recommendations/YC3';
import YaleHealth from './pages/recommendations/YaleHealth';
import Testimonial from './pages/Testimonial';

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
      <Routes>
        <Route path="/" element={<Home />} /> {/* default page */}
        <Route path="/Instructions" element={<Instructions />} />
        <Route path="/Q1" element={<Q1 />} />
        <Route path="/Q2" element={<Q2 />} />
        <Route path="/Q3" element={<Q3 />} />
        <Route path="/Q4" element={<Q4 />} />
        <Route path="/GLC" element={<GLC />} />
        <Route path="/Walden" element={<Walden />} />
        <Route path="/YC3" element={<YC3 />} />
        <Route path="/YaleHealth" element={<YaleHealth />} />
        <Route path="/CentralizedResources" element={<CentralizedResources />} />
        <Route path="/Testimonial" element={<Testimonial />} />
        <Route path="/final" element={<Final />} />

        {/* Add more routes here */}
      </Routes>
    </div>
  </Router>

);
};

export default App;

