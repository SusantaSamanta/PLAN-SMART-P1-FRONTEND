import axios from "axios";
import React, { useContext, useTransition } from "react";
import { DashboardContext } from "../../context/DashboardContext";
import { useNavigate } from "react-router-dom";
import Interview from "./Interview";
import { IoCall } from "react-icons/io5";


const InterviewInstructionModal = ({
    setOpenInterviewInstruction,
    applicationId, }) => {

    const [isInterviewLoaded, startInterviewLoading] = useTransition();


    const {
        pendingInterviews, setPendingInterviews,
        interviewPageOpen, setInterviewPageOpen,
    } = useContext(DashboardContext);


    const handleStartInterview = (applicationId) => {
        // console.log(applicationId)
        setInterviewPageOpen(true);
        startInterviewLoading(async () => {
            try {
                const { data } = await axios.post('/api/user/job/start-interview',
                    {
                        applicationId
                    },
                    {
                        headers: { 'Content-Type': 'application/json' },
                    }
                )
                if (data.success) {
                    console.log('interview : ', data)
                    // setOpenInterviewInstruction(false);
                } else {
                    console.log('interview error', data)
                }
            } catch (error) {
                console.log(error.response);
            }
        })
    }








    return (
        <div className="fixed inset-0 z-50 flex items-end md:items-center justify-center bg-black/60 backdrop-blur-[2px]">
            <div className="bg-[#121b33] w-full md:w-full md:max-w-lg rounded-b-none rounded-xl md:rounded-xl shadow-lg border border-gray-700 p-6">

                {/* Header */}
                <h2 className="text-xl font-semibold text-white mb-4">
                    Before You Start
                </h2>

                {/* Instructions */}
                <ul className="text-sm text-gray-300 space-y-2 list-disc list-inside">
                    <li>This is a <span className="text-blue-400">practice AI interview</span>.</li>
                    <li>Ensure a <span className="text-blue-400">stable internet connection</span>.</li>
                    <li><span className="text-red-400">Do not refresh</span> the page during the interview.</li>
                    <li><span className="text-red-400">Do not switch or close tabs</span>.</li>
                    <li>The interview is <span className="text-blue-400">time-bound</span>.</li>
                    <li>Answer honestly to receive accurate AI feedback.</li>
                    <li>Be in a quiet environment for best experience.</li>
                </ul>

                {/* Footer */}
                <div className="flex justify-end gap-4 mt-6">
                    <button
                        onClick={() => setOpenInterviewInstruction(false)}
                        className="px-4 py-2 rounded-md bg-gray-600 hover:bg-gray-700 text-sm"
                    >
                        Cancel
                    </button>

                    <button
                        onClick={() => handleStartInterview(applicationId)}
                        className="px-5 py-2 rounded-md bg-blue-600 hover:bg-blue-700 text-sm font-semibold flex"
                    >
                         Start Interview<IoCall className="mt-1 ml-2" />
                    </button>
                </div>
            </div>

            {interviewPageOpen &&
                <Interview
                    applicationId={applicationId}
                    isInterviewLoaded={isInterviewLoaded}
                />}

        </div>
    );
};

export default InterviewInstructionModal;
