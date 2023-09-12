import { useState } from "react";
import context from "./context";

const ProviderState = ({ children }) => {
    const [user, setUser] = useState(null);
    
    const fetchUser = async () => {
        const token = localStorage.getItem('token');
        if(token) {
          console.log(token);
          const res = await fetch(`http://localhost:8000/api/getuser`, {
            headers: {
              'Content-type': 'application/json',
              token: token
            },
            method: 'POST',
          });
          const user = await res.json();
          setUser(user);
        }
      }
    return (
        <context.Provider value={{ user,fetchUser }}>
            { children }
        </context.Provider>
    )
}

export default ProviderState;