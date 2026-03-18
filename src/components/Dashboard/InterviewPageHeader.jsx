import React, { useContext } from 'react'
import { RiRobot2Fill } from "react-icons/ri";
import { DashboardContext } from '../../context/DashboardContext';
const InterviewPageHeader = ({ applicationId }) => {

    const {
        pendingInterviews, setPendingInterviews,
        interviewPageOpen, setInterviewPageOpen,
    } = useContext(DashboardContext);

    const interviewDetails = pendingInterviews.filter((item) => item.applicationId === applicationId)[0];

    return (
        <>
            {/* Top Header */}
            <div className="flex items-center justify-between px-3 py-3 md:px-6 md:py-4 border-b border-gray-800">

                <div className="flex items-center gap-4">

                    <img
                        src={interviewDetails.companyLogo}
                        alt="company"
                        className="h-8 w-8 md:w-12 md:h-12 rounded-full object-contain bg-white border"
                    />

                    <div>
                        <h2 className="text-base md:text-lg font-semibold">
                            {interviewDetails.title}
                        </h2>

                        <p className="text-sm text-gray-400">
                            {interviewDetails.company} • {interviewDetails.sector}
                        </p>
                    </div>

                </div>

                <button onClick={() => setInterviewPageOpen(false)}
                    className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-md text-sm">
                    Exit
                </button>

            </div>

            {/* Info Tags */}
            <div className="flex flex-wrap gap-3 px-3 py-3 md:px-6 md:py-4 border-b border-gray-800">

                <span className="text-xs bg-blue-600/20 text-blue-400 px-3 py-1 rounded">
                    <RiRobot2Fill className="inline mr-1 relative bottom-[1px]" />
                    {interviewDetails.mode}
                </span>

                <span className="text-xs bg-purple-600/20 text-purple-400 px-3 py-1 rounded">
                    {interviewDetails.role}
                </span>

                <span
                    className={`text-xs px-2 py-1 rounded 
                                            ${interviewDetails.role === "Freshers" ? "bg-green-600/20 text-green-400"
                            : interviewDetails.role === "Experienced"
                                ? "bg-yellow-600/20 text-yellow-400"
                                : "bg-red-600/20 text-red-400"
                        }
                                                `}
                > {interviewDetails.role == 'Freshers' ? <span>Easy</span> : <span>Medium</span>}</span>

                <span className="text-xs bg-orange-600/20 text-orange-400 px-3 py-1 rounded">
                    {interviewDetails.language}
                </span>

                <span className="text-xs bg-yellow-700/30 text-yellow-300 px-3 py-1 rounded">
                    Attempt: {interviewDetails.attempts + 1}
                </span>

            </div>
        </>
    )
}

export default InterviewPageHeader