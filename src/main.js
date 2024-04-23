import './App.css';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import React, { useState } from 'react'; 

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
import GLCTestimonials from './pages/testimonials/GLC';
import WaldenTestimonials from './pages/testimonials/Walden';
import YC3Testimonials from './pages/testimonials/YC3';
import YaleHealthTestimonials from './pages/testimonials/YaleHealth';
// import Testimonial from './pages/Testimonial';

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
  // Read initial values from localStorage or set default values
  const answer1 = localStorage.getItem('answer1') || '';
  const answer2 = localStorage.getItem('answer2') || '';
  const answer3 = localStorage.getItem('answer3') || '';
  const answer4 = localStorage.getItem('answer4') || '';

  // Function to update localStorage with new values
  const setLocalStorageAnswer = (key, value) => {
    localStorage.setItem(key, value);
  };

  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Instructions" element={<Instructions />} />
          <Route
            path="/Q1"
            element={<Q1 setAnswer={value => setLocalStorageAnswer('answer1', value)} />}
          />
          <Route
            path="/Q2"
            element={<Q2 setAnswer={value => setLocalStorageAnswer('answer2', value)} />}
          />
          <Route
            path="/Q3"
            element={<Q3 setAnswer={value => setLocalStorageAnswer('answer3', value)} />}
          />
          <Route
            path="/Q4"
            element={<Q4
              setAnswer={value => setLocalStorageAnswer('answer4', value)}
              answer1={answer1}
              answer2={answer2}
              answer3={answer3}
              answer4={answer4}
            />}
          />
          <Route path="/GLC" element={<GLC />} />
          <Route path="/Walden" element={<Walden />} />
          <Route path="/YC3" element={<YC3 />} />
          <Route path="/YaleHealth" element={<YaleHealth />} />
          <Route path="/GLCTestimonials" element={<GLCTestimonials />} />
          <Route path="/WaldenTestimonials" element={<WaldenTestimonials />} />
          <Route path="/YC3Testimonials" element={<YC3Testimonials />} />
          <Route path="/YaleHealthTestimonials" element={<YaleHealthTestimonials />} />
          <Route path="/CentralizedResources" element={<CentralizedResources />} />
          <Route path="/final" element={<Final />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
