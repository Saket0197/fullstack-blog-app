import { createContext, useState } from "react";

export const UserContext = createContext();

export default function ContextProvider({children}) {

    const [isLoggedIn,setLoggedIn] = useState(false);
    const [userInfo,setUserInfo] = useState(null);
    const [loading,setLoading] = useState(false);

    const value = {
        isLoggedIn,
        setLoggedIn,
        userInfo,
        setUserInfo,
        loading,
        setLoading
    };

    return <UserContext.Provider value={value}>{children}</UserContext.Provider>

}