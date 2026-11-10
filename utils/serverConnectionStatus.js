import axios from "axios"



export const serverConnectionStatus = async () => {
    try {
        const {data} = await axios.get('/',);
        // console.log(data);
        if (data.success) {
            return true;
        }
        return false;
    } catch (error) {
        return false;
    }
}