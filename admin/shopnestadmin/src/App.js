
import './App.css';
import Login from './Components/Login/Login';
import Main from './Components/Main/Main';
import Navbar from './Components/Navbar/Navbar';
import Sidebar from './Components/Sidebar/Sidebar';
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
        <Routes>
          <Route path="/"  element={<Login />} />
          <Route path='/*'  element={<Main />} />
          
        </Routes>
        {/* <Main/> */}
    </div>
  );
}

export default App;
