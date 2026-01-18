import React, { useContext, useEffect, useRef, useState } from "react";
import JobList from "../../../components/Dashboard/JobProfiles/JobList";
import JobDetails from "../../../components/Dashboard/JobProfiles/JobDetails";
import { DashboardContext } from "../../../context/DashboardContext";
import { toast } from "react-toastify";
import axios from "axios";
import { fetchAllJobs } from "../../../../utils/dashboardDataFetch";


const DashboardJobProfiles = () => {
    const [selectedJob, setSelectedJob] = useState(null);
    const closeDetails = () => {
        setSelectedJob(null)
    };

    const { allJobs, setAllJobs, appliedJobs } = useContext(DashboardContext);


    useEffect(() => {
        const call = async () => {
            const res = await fetchAllJobs();
            if (res) {
                setAllJobs(res);
            } else setAllJobs([]);
        }
        call()
    }, [])




    return (
        <div className="flex h-full gap-1 px-0 md:px-0 py-0 border-0">

            {/* LEFT – Job List */}
            <div className="w-full md:w-2/5 lg:w-1/3 bg-[#121b33] 
            rounded-tl-[8px] rounded-bl-[8px] rounded-tr-none rounded-br-none
            overflow-y-auto">
                <JobList
                    onSelectJob={setSelectedJob}
                    selectedJob={selectedJob}
                />
            </div>

            {/* RIGHT – Job Details (Desktop only) */}
            <div className="hidden md:block flex-1 bg-[#121b33] rounded-r-lg rounded-l-none
 overflow-y-auto">
                {selectedJob ? (  // if one job select from <JobList/> then only showing <JobDetails/>>
                    <JobDetails job={selectedJob} />
                ) : (
                    <div className="flex items-center justify-center h-full text-gray-400">
                        Select a job to view details
                    </div>
                )}
            </div>

            {/* MOBILE – Job Details Modal */}
            {selectedJob && (
                <div className="fixed inset-0 z-50 bg-black/60 md:hidden">
                    <div className="absolute inset-0 bg-[#121b33] overflow-y-auto border-0">

                        {/* Header */}
                        <div className="flex items-center justify-between p-4 border-b border-gray-700">
                            <h2 className="text-lg font-semibold">
                                {selectedJob.title}
                            </h2>
                            <button
                                onClick={closeDetails}
                                className="text-gray-400 text-xl"
                            >
                                ✕
                            </button>
                        </div>

                        {/* Content */}
                        <div className="p-0 border-0">
                            <JobDetails job={selectedJob} />
                        </div>
                    </div>
                </div>
            )}


        </div>
    );
};

export default DashboardJobProfiles;
