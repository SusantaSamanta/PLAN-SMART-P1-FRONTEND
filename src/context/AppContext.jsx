import React, { createContext, useEffect, useState } from 'react';
import { checkUserLogin, getProfileData } from '../../utils/checkUserLogin';
import { serverConnectionStatus } from '../../utils/serverConnectionStatus';


export const AppContext = createContext();

const AppContextProvider = (props) => {

    const [isLogin, setIsLogin] = useState(false);
    const [userDetails, setUserDetails] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const [profileSetupStep, setProfileSetupStep] = useState(1);
    const [profileSetupForm, setProfileSetupForm] = useState({
        name: "",
        email: "",
        phone: "",
        location: "",
        highestQualification: "",
        university: "",
        graduationYear: "",
        hasExperience: "", // 'yes' or 'no'
        experienceYears: "",
        currentRole: "",
        skills: [],
    });
    const [profilePicUrl, setProfilePicUrl] = useState('../src/assets/dummyProfile.jpg');
    const [userCvUrl, setUserCvUrl] = useState('');
    const [isProfileComplete, setIsProfileComplete] = useState(false);
    const [openModal, setOpenModal] = useState(false);
    const [isServerConnected, setIsServerConnected,] = useState(false);


    const variablesForSend = {
        isLogin, setIsLogin,
        userDetails, setUserDetails,
        isLoading, setIsLoading,
        profileSetupStep, setProfileSetupStep,
        profileSetupForm, setProfileSetupForm,
        profilePicUrl, setProfilePicUrl,
        userCvUrl, setUserCvUrl,
        isProfileComplete, setIsProfileComplete,
        openModal, setOpenModal,
        isServerConnected, setIsServerConnected,
    }





    useEffect(() => {
        const callCheckUserLogin = async () => {
            const data = await checkUserLogin();
            if (data) {
                setIsLogin(true);
                // setShowLoginPage(false);
                setUserDetails(data);
                // console.log('User data : ', data);

            } else {
                setIsLogin(false);
                setUserDetails(null);
            }
            setIsLoading(false);



        };
        callCheckUserLogin();
    }, []);


    useEffect(() => {
        const callGetProfile = async () => {
            const res = await getProfileData();
            if (res) {
                setProfileSetupForm(res.profileData);
                setProfilePicUrl(res.profilePicUrl);
                setUserCvUrl(res.cvUrl);
                setIsProfileComplete(res.fullyUpdated);
            }
        }
        callGetProfile()
    }, [isLogin])



    useEffect(() => {
        let isAlreadyConnected = JSON.parse(localStorage.getItem("server"));
        if (isAlreadyConnected && isAlreadyConnected.isRunning && isAlreadyConnected.time > Date.now()) {
            console.log(isAlreadyConnected, "lll")
            setIsServerConnected(true);
            setIsLoading(true);
            return
        }
        setIsServerConnected(false);

        async function serverStatus() {

            if (isAlreadyConnected && isAlreadyConnected.isRunning && isAlreadyConnected.time > Date.now()) {
                return
            }

            console.log(isAlreadyConnected, "okkkk")
            const status = await serverConnectionStatus();
            setIsServerConnected(status ? true : false);
            if (status) {
                localStorage.setItem("server", JSON.stringify({ isRunning: true, time: Date.now() + 15 * 60 * 1000, }));
                isAlreadyConnected = { isRunning: true, time: Date.now() + 15 * 60 * 1000, }
            } else {
                localStorage.setItem("server", JSON.stringify({ isRunning: false, time: Date.now() }));
            }
        }
        serverStatus();
        setInterval(() => {
            serverStatus();
        }, 10000);
    }, []);




    return (
        <AppContext.Provider value={variablesForSend}>
            {props.children}
        </AppContext.Provider>
    )
}

export default AppContextProvider;