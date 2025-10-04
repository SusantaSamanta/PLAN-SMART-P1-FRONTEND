import React, { createContext, useEffect, useState } from 'react';
import { checkUserLogin } from '../../utils/checkUserLogin';


export const AppContext = createContext();

const AppContextProvider = (props) => {

    const [isLogin, setIsLogin] = useState(false);
    const [userDetails, setUserDetails] = useState({});
    const [isLoading, setIsLoading] = useState(true);



    const variablesForSend = {
        isLogin, setIsLogin,
        userDetails, setUserDetails,
        isLoading, setIsLoading
    }





    useEffect(() => {
        const callCheckUserLogin = async () => {
            const data = await checkUserLogin();
            if (data) {
                setIsLogin(true);
                // setShowLoginPage(false);
                setUserDetails(data);
                console.log('User data : ', data);

            } else {
                setIsLogin(false);
                setUserDetails(null);
            }
            setIsLoading(false);
        };
        callCheckUserLogin();
    }, []);




    return (
        <AppContext.Provider value={variablesForSend}>
            {props.children}
        </AppContext.Provider>
    )
}

export default AppContextProvider;