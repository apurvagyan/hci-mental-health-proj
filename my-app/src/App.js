import './App.css';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import Final from './pages/Final';
import Q1 from './pages/Q1';


function App() {
  return (
    <Router>
    <div>
        <li><Link to="/home">Home</Link></li>
        <li><Link to="/final">Final</Link></li>
        <li><Link to="/Q1">Let's get started</Link></li>
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/final" element={<Final />} />
        <Route path="/Q1" element={<Q1 />} />
        {/* Add more routes here */}
      </Routes>
    </div>
  </Router>

);
};

export default App;

