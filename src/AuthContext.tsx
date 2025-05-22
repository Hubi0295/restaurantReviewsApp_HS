import {createContext, useContext, useState} from "react";

interface AuthContextType{
    username:string|null;
    setUsername:(name:string|null)=>void;
}

const AuthContext = createContext<AuthContextType|undefined>(undefined);

export function AuthProvider({children}){
    const [username,setUsername]=useState(null);

    return (
        <AuthContext.Provider value={{ username, setUsername}}>
            {children}
        </AuthContext.Provider>
    )
}
export function useAuth():AuthContextType{
    return useContext(AuthContext);
}