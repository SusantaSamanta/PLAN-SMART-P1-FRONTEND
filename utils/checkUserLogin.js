import axios from "axios";

export const checkUserLogin = async () => {

    try {
        const { data } = await axios.get('/api/auth/check-user-login');
        if (data.success) {
            // console.log('User : ', data.user);
            return data.user;
        } else {
            return false;
        }
    } catch (error) {
        // console.log(error.response);
        return false;
    }
}

export const getProfileData = async () => {

    try {
        const { data } = await axios.get('/api/user/get-profile');
        if (data.success) {
            const { profileData, profilePicUrl } = data.userProfileData;
            // console.log('my  : ', profileData, profilePicUrl);
            // console.log('Tom  : ', data.userProfileData);
            
            return { profileData, profilePicUrl };
        } else {
            return false;
        }
    } catch (error) {
        console.log(error.response);
        return false;
    }
}