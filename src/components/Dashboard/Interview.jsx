import React, { useContext, useState } from "react";
import InterviewPageHeader from "./InterviewPageHeader";
import { AppContext } from "../../context/AppContext";

const Interview = ({ applicationId, isInterviewLoaded }) => {

    const { profilePicUrl, userDetails } = useContext(AppContext);

    const [captions, setCaptions] = useState([
        { speaker: "ai", text: "Tell me about yourself." },
        { speaker: "user", text: "I recently completed my BCA and enjoy working with AI." },
    ]);



    return (
        <div className="fixed inset-0 z-50 flex flex-col bg-[#0a0f1c] text-white">

            <InterviewPageHeader applicationId={applicationId} />

            {/* Main Interview Area */}
            <div className="flex flex-1 flex-col items-center justify-center px-6 text-center">

                {isInterviewLoaded ? (
                    <h2 className="text-gray-400 text-lg">Loading interview...</h2>
                ) : (
                    <>
                        {/* Initial message */}
                        <h1 className="text-2xl md:text-3xl font-semibold mb-6 text-center">
                            AI Interview in Progress
                        </h1>

                        <p className="text-gray-400 mb-10 max-w-xl text-center">
                            The AI interviewer will ask questions related to the job role. Listen carefully and answer clearly when prompted.
                        </p>




                        <div className="relative flex items-center justify-center">

                            <span className="absolute w-28 h-28 rounded-full bg-blue-500 opacity-20 animate-ping"></span>
                            <span className="absolute w-32 h-32 rounded-full bg-blue-500 opacity-10 animate-ping delay-150"></span>

                            <div className="w-20 h-20 rounded-full bg-blue-600 flex items-center justify-center text-3xl z-10">
                                🤖
                            </div>

                        </div>




                        {/* Call Area */}
                        <div className="flex flex-col md:flex-row items-center justify-center gap-10 md:gap-20 mb-10 border-0">

                            {/* AI Agent */}
                            <div className="flex flex-col items-center gap-3">
                                <div className="relative">
                                    <div className="w-24 h-24 md:w-32 md:h-32 rounded-full bg-blue-600 flex items-center justify-center text-4xl">
                                        🤖
                                    </div>

                                    {/* Speaking Indicator */}
                                    <span className="absolute bottom-0 right-0 w-4 h-4 bg-green-400 rounded-full animate-pulse"></span>
                                </div>

                                <p className="text-sm text-gray-300">AI Interviewer</p>
                            </div>

                            {/* User */}
                            <div className="flex flex-col items-center gap-3">
                                <div className="relative">
                                    <div className="w-24 h-24 md:w-32 md:h-32 rounded-full bg-gray-700 flex items-center justify-center text-4xl">
                                        <img className="rounded-full" src={profilePicUrl} />
                                    </div>

                                    {/* Mic Indicator */}
                                    <span className="absolute bottom-0 right-0 w-4 h-4 bg-green-400 rounded-full"></span>
                                </div>

                                <p className="text-sm text-gray-300">You</p>
                            </div>

                        </div>

                        {/* Controls */}
                        <div className="flex justify-center gap-5">

                            {/* Start Interview */}
                            {/* <button className="px-5 py-2 md:px-8 md:py-3 bg-blue-600 hover:bg-blue-700 rounded-lg font-semibold text-base md:text-lg">
                                Start Interview
                            </button> */}

                            {/* End Call */}
                            <button className="px-5 py-2 md:px-8 md:py-3 bg-red-600 hover:bg-red-700 rounded-lg font-semibold text-base md:text-lg">
                                End Call
                            </button>

                        </div>
                    </>
                )}

            </div>

            {/* Live Caption Area */}
            <div className="border-t border-gray-800 p-2 bg-[#121b33]">

                <p className="pl-1 md:pl-4 text-xs text-gray-400 mb-0">
                    Live Caption
                </p>

                <div className="min-h-[60px] pl-2 md:pl-4 text-left flex flex-col justify-center leading-relaxed">

                    {captions.slice(-2).map((item, index) => (
                        <span
                            key={index}
                            className={`text-sm md:text-base font-medium ${item.speaker === "ai"
                                ? "text-blue-300"
                                : "text-white-300"
                                }`}
                        >
                            {item.text}
                        </span>
                    ))}

                </div>

            </div>

        </div>
    );
};

export default Interview;