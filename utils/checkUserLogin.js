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
            const { profileData, profilePicUrl, cvUrl, fullyUpdated } = data.userProfileData;
            console.log('my  : ', fullyUpdated);
            return { profileData, profilePicUrl, cvUrl, fullyUpdated };
        } else {
            return false;
        }
    } catch (error) {
        console.log(error.response);
        return false;
    }
}
