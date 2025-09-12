import React, { createContext, useState } from 'react';


export const AppContext = createContext();

const AppContextProvider = (props) => {
    const [isLogin, setIsLogin] = useState(true);
    const [userDetails, setUserDetails] = useState([]);


    const variablesForSend = {
        isLogin, setIsLogin
    }

    return (
        <AppContext.Provider value={variablesForSend}>
            {props.children}
        </AppContext.Provider>
    )
}

export default AppContextProvider;