import {
  BrowserRouter,
  Route,
  Routes
} from "react-router-dom";
import Home from "./Components/Pages/HomePage/Home";
import Navbar from "./Components/Pages/Navbars/Navbar";
import Movies from "./Components/Pages/MovieCart/MovieCart";
import Profile from "./Components/Pages/ProfilePage/Profile";

function App() {
  return (
    <div >
      <Navbar/>
     
        <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/movies" element={<Movies/>}/>
        <Route path="/profile" element={<Profile/>}/>
        </Routes>
     
    </div>
  );
}

export default App;
