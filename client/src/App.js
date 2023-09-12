import {
  Route,
  Routes
} from "react-router-dom";
import Home from "./Components/Pages/HomePage/Home";
import Movies from "./Components/Pages/MovieCart/MovieCart";
import Admin from "./Components/Pages/ProfilePage/Profile";
import User from "./Components/Pages/UserPage/user";
import Login from "./Components/Pages/Login/loginSignup";
import Profile from "./Components/Pages/ProfilePage/Profile";
import BookTicketPage from "./Components/Pages/BookTicketPage/BookTcketPage";

function App() {
  return (
    <div >
      <Routes>
        <Route path="/login" element={<Login/>}/>
      </Routes>
        <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/movies" element={<Movies/>}/>
        <Route path="/admin" element={<Admin/>}/>
        <Route path="/user" element={<User/>}/>
        <Route path="/profile" element={<Profile/>}/>
        <Route path="/book" element={<BookTicketPage/>}/>

        </Routes>
    </div>
  );
}

export default App;
