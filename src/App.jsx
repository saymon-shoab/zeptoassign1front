import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import "./App.css";
import FontGroups from "./page/FontGroups";
import FontUploader from "./page/FontUploader";


function App() {


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
        <Route path="/" element={<FontUploader/>} />
        <Route path="/create" element={<FontGroups />} />
      </Routes>
    </Router>
  );
}

export default App;
