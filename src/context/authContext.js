import axios from "axios";
import { createContext, useEffect, useState, } from "react";


export const AuthContext = createContext();

export const AuthContextProvider = ({children}) => {
    const [currentUser, setCurrentUser] = useState(
        JSON.parse(localStorage.getItem('user')) || null
    );

   

    const login =  async () => {
        await axios.get(`${process.env.REACT_APP_API}/user`, {
            withCredentials: true,
        })
        .then(response => {
            console.log(response);
            setCurrentUser(response.data)

           
        })
          
    }



    useEffect(() => {
        localStorage.setItem('user', JSON.stringify(currentUser));
    }, [currentUser]);

    return (
        <AuthContext.Provider value = {{currentUser, login}} >
            {children}
        </AuthContext.Provider>
    )
}