import { useState,useEffect } from "react";
import context from "./context";

const ProviderState = ({ children }) => {

    const [user, setUser] = useState(null);
    
   
    const [isusersignin,Setusersignin] = useState(false);
    const [isprofilename,Setprofilename] = useState("Profile");
    const [isAdmin,setAdmin] = useState(false);
    const [list,setList] = useState([]);

    useEffect( () => {
        const fetchUser = async () => {
          const token = localStorage.getItem('token');
          if(token) {
            const res = await fetch(`http://localhost:8000/api/getuser`, {
              headers: {
                'Content-type': 'application/json',
                token: token
              },
              method: 'POST',
            });
            const user = await res.json();
            if(!user) {
              localStorage.removeItem('token');
            }
            else {
              setUser(user);
              Setusersignin(true);
              Setprofilename(user.name);
              if(user.email === "devvratgupta123@gmail.com" || user.email=== "pratikgupta123@gmail.com"){
                setAdmin(true);
              }
              console.log(user);
            }
          }
        }
        fetchUser();
      }, [])
      useEffect(() => {
        const User = async () => {
            try {
                const response = await fetch('http://localhost:8000/theatre', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });
                const res = await response.json();
                setList(res);
            }
            catch (e) {
            }
        }
        User();
    })
    return (
        <context.Provider value={{ isusersignin, isAdmin, isprofilename, list,user }}>

            { children }
        </context.Provider>
    )
}

export default ProviderState;