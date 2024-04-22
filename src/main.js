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

// flags for transitioning to other screens
var start_flag = true;
var q1Flag = false;
var q2Flag = false;
var q3Flag = false;
var q4Flag = false;
var instructionsFlag = false;



// define frames for program execution
// define frames for program execution
var frames = {
  socket: null,

  start: function () {
    var url = "ws://" + host + "/frames";
    frames.socket = new WebSocket(url);
    frames.socket.onmessage = function (event) {
      frames.show(JSON.parse(event.data));
      let frame = JSON.parse(event.data);

      // If a person is seen, start monitoring their movements
      if (frame.people && frame["people"][0]) {
        // Calculate head height
        var head_height = frame["people"][0]["joints"][26]["position"]["y"];

        // Calculate head length
        var head_length = frame["people"][0]["joints"][26]["position"]["x"];

        // Calculate left hand height
        var lh_height = frame["people"][0]["joints"][8]["position"]["y"];

        // Calculate left hand length
        var lh_length = frame["people"][0]["joints"][8]["position"]["x"];

        // Calculate right hand height
        var rh_height = frame["people"][0]["joints"][15]["position"]["y"];

        // Calculate right hand height
        var rh_length = frame["people"][0]["joints"][15]["position"]["x"];

        // Moving left
        var option_left = lh_length < head_length && rh_length < head_length;

        // Moving right
        var option_right = lh_length > head_length && rh_length > head_length;

        // Hand raising
        var hand_raised = lh_height < head_height && rh_height < head_height;

        // Decision tree
        if (!start_flag && hand_raised) {
          Instructions(); 
        }

        if (!start_flag && q1Flag && option_left) {
          if (q2Flag && option_left) {
            if (q3Flag && option_left) {
              Walden();
            }
            else if (q3Flag && option_right) {
              YC3();
            }
          }
          else if (q2Flag && option_right) {
            if (q3Flag && option_left) {
              Walden();
            }
            else if (q3Flag && option_right) {
              YaleHealth();
            }
          }
        }

        else if (!start_flag && q1Flag && option_right) {
          if (q2Flag && option_left) {
            if (q3Flag && option_left) {
              if (q4Flag && option_left) {
                GLC();
              }
              else if (q4Flag && option_right) {
                Walden();
              }
            }
            else if (q3Flag && option_right) {
              if (q4Flag && option_left) {
                GLC();
              }
              else if (q4Flag && option_right) {
                YC3();
              }
            }
          }
          else if (q2Flag && option_right) {
            if (q3Flag && option_left) {
              if (q4Flag && option_left) {
                GLC();
              }
              else if (q4Flag && option_right) {
                Walden();
              }
            }
            else if (q3Flag && option_right) {
              YC3();
            }
          }
        }
      }
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
        <Route path="/GLCTestimonials" element={<GLCTestimonials />} />
        <Route path="/WaldenTestimonials" element={<WaldenTestimonials />} />
        <Route path="/YC3Testimonials" element={<YC3Testimonials />} />
        <Route path="/YaleHealthTestimonials" element={<YaleHealthTestimonials />} />
        <Route path="/CentralizedResources" element={<CentralizedResources />} />
        {/* <Route path="/Testimonial" element={<Testimonial />} /> */}
        {/* <Route path="/final" element={<Final />} /> */}
          {/* Add more routes here */}
        </Routes>
      </div>
    </Router>

  );
};

export default App;


// if (frame.people && frame["people"][0]) {

