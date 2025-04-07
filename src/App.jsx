import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import FontGroups from "./page/FontGroups";
import FontList from "./page/FontList";
import Navbars from './components/Navbars';
import CreateFontGroup from "./page/CreateFontGroup";


function App() {


  return (
   
<BrowserRouter>
  <Navbars /> 
  <Routes>
    <Route path="/" element={<FontList />} />
    <Route path="/fontgroup" element={<FontGroups />} />
    <Route path="/create-font-group" element={<CreateFontGroup />} />
  </Routes>
</BrowserRouter>
  );
}

export default App;
