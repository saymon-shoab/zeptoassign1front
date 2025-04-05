import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import "./App.css";
import FontGroups from "./page/FontGroups";
import FontUploader from "./page/FontUploader";
import { useState } from 'react';

function App() {
  const [fonts, setFonts] = useState([]);

  return (
    <Router>
      <nav className="navbar navbar-expand-lg navbar-light bg-light px-4">
        <Link to="/" className="navbar-brand">Font App</Link>
        <div className="navbar-nav">
          <Link to="/" className="nav-link">Font List</Link>
          <Link to="/create" className="nav-link">Create Group</Link>
        </div>
      </nav>
      <Routes>
        <Route path="/" element={<FontUploader fonts={fonts} setFonts={setFonts} />} />
        <Route path="/create" element={<FontGroups fonts={fonts} />} />
      </Routes>
    </Router>
  );
}

export default App;
