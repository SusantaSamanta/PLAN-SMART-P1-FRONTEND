import React, { createContext, useEffect, useState } from 'react';
import { checkUserLogin, getProfileData } from '../../utils/checkUserLogin';


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
    }





    useEffect(() => {
        const callCheckUserLogin = async () => {
            const data = await checkUserLogin();
            if (data) {
                setIsLogin(true);
                // setShowLoginPage(false);
                setUserDetails(data);
                // console.log('User data : ', data.name);

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




    return (
        <AppContext.Provider value={variablesForSend}>
            {props.children}
        </AppContext.Provider>
    )
}

export default AppContextProvider;