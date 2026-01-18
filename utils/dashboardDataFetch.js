import axios from "axios";
import { data } from "react-router-dom";

export const fetchAllJobs = async () => {
    try {
        const res = await axios.get('/api/user/job/get-all-job-profile');
        if (res.data.success) {
            return res.data.result;
        } else {
            return false
        }
    } catch (error) {
        console.log(error);
        return false;
    }
}


export const fetchAllPendingInterviews = async () => {
    try {
        const { data } = await axios.get('/api/user/job/get-pending-interviews');
        if (data.success) {
            const finalDataForPendingInterviews = data.result.map((detail) => ({
                applicationId: detail._id,
                attempts: detail.attempts,
                // from populated job
                sector: detail.job.sector,
                role: detail.job.role,
                title: detail.job.title,
                company: detail.job.company,
                companyLogo: detail.job.companyLogo,
                difficulty: detail.job.role,

                // derived / static (for now)
                mode: "AI Interview",
                language: "English",
            }));

            return finalDataForPendingInterviews;
        } else {
            return [];
        }
    } catch (error) {
        console.log(error);
        return [];
    }
}



















