import { useState } from "react";
import context from "./context";

const ProviderState = ({ children }) => {
    const [user, setUser] = useState(null);
    
    return (
        <context.Provider value={{ user }}>
            { children }
        </context.Provider>
    )
}

export default ProviderState;