import axios from "axios";
import { useContext } from "react";
import { toast } from "react-toastify";
import { DashboardContext } from "../../../context/DashboardContext";




const JobDetails = ({ job }) => {

    const { appliedJobs, setAppliedJobs, checkIsJobApplied } = useContext(DashboardContext);

    // const checkFun = (jobId) => {
    //     // console.log(appliedJobs, 'cap');
    //     const appliedJob = appliedJobs.find(
    //         (job) => String(job.job) === String(jobId)
    //     );

    //     if (!appliedJob) return "Apply";
    //     if (appliedJob.attempts === 1) return "Applied";
    //     if (appliedJob.attempts > 1) return "Re Apply";

    //     return "Apply";
    // };
    const button = (id) => {
        const [data, isAbleToApply] = checkIsJobApplied(id);
        return (<button onClick={() => handleApplication(id, isAbleToApply)} className={`max-w-100 mt-4 px-5 py-2 ${isAbleToApply ? 'bg-blue-600 hover:bg-blue-700' : 'bg-gray-600 hover:bg-gray-700'} rounded-md text-base font-[600] cursor-pointer`}>
            <span>{data}</span>
        </button>)

    }




    const handleApplication = async (jobId, isAbleToApply) => {
        if (!isAbleToApply) {
            toast.warning('Not give already applied')
            return;
        }
        try {
            const { data } = await axios.post('/api/user/job/set-job-application',
                {
                    jobId
                },
                {
                    headers: { 'Content-Type': 'application/json' },
                }
            )
            console.log(data, 'this ');
            const newAppliedJob = {
                _id: data.result.applicationId,
                job: data.result.jobId,
                attempts: data.result.attempts,
            };

            setAppliedJobs((prev) => [...prev, newAppliedJob]);

            toast.success("Ok job applied, go to interview section");

        } catch (error) {
            error.response.data.message ? toast.error(error.response.data.message) :
                console.log(error);
        }


    }







    const Section = ({ title, children }) => (
        <div className="mb-6">
            <h3 className="text-lg font-medium mb-2">{title}</h3>
            {children}
        </div>
    );

    const Item = ({ label, value }) => (
        <div className="flex  text-sm mb-1">
            <span className="w-40 text-gray-400 border-0">{label + ':'}</span>
            <span className="text-white">{value}</span>
        </div>
    );

    return (
        <div className="p-3 md:p-6">

            {/* Header */}
            <div className="mb-4 pb-3 border-b-1 border-gray-600 flex flex-col  justify-between">
                <div className="flex items-center">
                    <div className="h-12 w-12 mr-4 rounded-full border-2 flex items-center justify-center overflow-hidden">
                        <img src={job.companyLogo} />
                    </div>
                    <div>
                        <h2 className="text-2xl font-semibold">{job.title}</h2>
                        <p className="text-gray-400">
                            {job.company} | {job.location} | {job.jobType}
                        </p>
                    </div>
                </div>
                {
                    button(job._id)
                }
            </div>

            {/* Overview */}
            <Section title="Opening Overview">
                <Item label="Job Sector" value={job.sector} />
                <Item label="Job Role" value={job.role} />
                <Item label={job.compensation.type} value={job.compensation.value} />
            </Section>

            {/* Job Description */}
            <Section title="Job Description">
                <p className="text-gray-300 leading-relaxed">
                    {

                        job.description.map((para, i) => {
                            return (
                                <p key={i} className={`${i == 0 ? '' : 'mt-4'}`}>
                                    {job.description[i]}
                                </p>
                            )
                        })
                    }
                </p>
            </Section>

            {/* Eligibility */}
            <Section title="Required Skills">
                <ul className="list-disc ml-6 text-gray-300 space-y-1">
                    {
                        job.requiredSkills.map((skill, i) => {
                            return (
                                <li key={i}>{skill}</li>
                            )
                        })
                    }
                </ul>
            </Section>

            {/* CTA */}
            {/* <button
                disabled
                className="mt-6 px-6 py-2 bg-gray-700 rounded cursor-not-allowed"
            >
                Deadline Closed
            </button> */}
        </div>
    );
};

export default JobDetails;
