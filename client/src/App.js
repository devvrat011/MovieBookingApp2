import {
  BrowserRouter,
  Route,
  Routes
} from "react-router-dom";
import Home from "./Components/Pages/HomePage/Home";
import Navbar from "./Components/Pages/Navbars/Navbar";
import Movies from "./Components/Pages/MovieCart/MovieCart";
import Admin from "./Components/Pages/ProfilePage/Profile";
import User from "./Components/Pages/UserPage/Theatreuser"
import Login from "./Components/Pages/Login/loginSignup";

function App() {
  return (
    <div >
      <Routes>
        <Route path="/login" element={<Login/>}/>
      </Routes>
      <Navbar/>
        <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/movies" element={<Movies/>}/>
        <Route path="/admin" element={<Admin/>}/>
        <Route path="/user" element={<User/>}/>
        </Routes>
    </div>
  );
}

export default App;
