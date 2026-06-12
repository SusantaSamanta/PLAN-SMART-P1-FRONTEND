import React, { useContext, useEffect, useRef, useState } from "react";
import InterviewPageHeader from "./InterviewPageHeader";
import { AppContext } from "../../context/AppContext";
import { vapi } from "../../../lib/vapi";
import { DashboardContext } from "../../context/DashboardContext";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { deletePendingInterview } from "../../store/slices/PendingInterviewsSlice";


// Your assistant config (workflow as assistant)
export const interviewWorkflowAssistant = {
    name: "jsm_interview",
    firstMessage: "Hello {{username}}, are you ready to give an interview?",

    transcriber: {
        provider: "deepgram",
        model: "nova-2",
        language: "en",
    },

    voice: {
        provider: "11labs",
        voiceId: "sarah",
        stability: 0.4,
        similarityBoost: 0.8,
        speed: 0.9,
        style: 0.5,
        useSpeakerBoost: true,
    },

    model: {
        provider: "openai",
        model: "gpt-4o",
        messages: [
            {
                role: "system",
                content: `
            You are a recruiter of an IT company. You are conducting a voice interview with the candidate.
                        
            Workflow Guidelines:
            1. Start by greeting the user: "Hello {{username}}, are you ready to give an interview?"
            2. If the candidate says "yes", continue the interview.
            3. asked questions based on the job details: {{jobDetails}} and question set: {{questions}}
            3. If the user stays silent for too long, gently remind them: "I cannot hear you, are you still there?" and then wait again.
            4. After the conversation, say: "Ok good job, your interview has ended, thank you. and also say "goodbye"
            5. Then hang up the call.
                        
            Rules:
            - Keep all responses short, professional, and natural like a real conversation.
            - Acknowledge answers and move on smoothly.
            - End the call politely when finished.
            - If user not say anything remind them, gently remind them: "I cannot hear you, are you still there?" and then wait again.
        `,

            },
        ],
    },


};



const Interview = ({ applicationId, isInterviewLoaded, setOpenInterviewInstruction }) => {

    const dispatch = useDispatch();
    const { profilePicUrl, userDetails, } = useContext(AppContext);
    const { interviewPageOpen, setInterviewPageOpen } = useContext(DashboardContext);


    //////////// Variables for specking  /////////////
    const [isSpecking, setIsSpecking] = useState(false);
    const [conversation, setConversation] = useState([]);
    const [botCaption, setBotCaption] = useState('');
    const botCaptionTimerRef = useRef(null);
    const botSpeckingBorderSymbolRef = useRef(true);


    // for border animation
    const [isBotSpecking, setIsBotSpecking] = useState(false);
    const [isUserSpecking, setIsUserSpecking] = useState(false);

    const [isCallConnecting, setIsCallConnecting] = useState(false);


    /// code for vapi   



    const currentInterviewData = useSelector((state) => state.currentInterviewData);
    const pendingInterviews = useSelector((state) => state.pendingInterviews);

    // console.log(currentInterviewData)

    // console.log(pendingInterviews)
    const { company, title, sector, role, } = pendingInterviews.filter((item) => item.applicationId === applicationId)[0];
    const jobDetailsForInterview = { company, title, sector, role };
    // console.log(jobDetailsForInterview);



    const isVapiError = useRef(false);
    const [error, setError] = useState(false);
    const [hasPlayed, setHasPlayed] = useState(false);
    useEffect(() => {
        const audio = new Audio("../src/assets/audio/vapi err.mp3");
        if (error && !hasPlayed) {
            audio.play().catch(() => { console.log('Audio error... !') });
            setHasPlayed(true);
        }
    }, [error]);

    useEffect(() => {
        const fun = async () => {

            vapi.on("message", (msg) => {

                setIsCallConnecting(false);

                if (msg.type == 'transcript') {
                    if (msg.role == 'assistant' && msg.transcriptType == 'partial') {
                        // set new caption (replace old)
                        setBotCaption(msg.transcript);
                        // clear previous timer
                        if (botCaptionTimerRef.current) {
                            clearTimeout(botCaptionTimerRef.current);
                        }
                        // set new timer to clear after 2 sec
                        botCaptionTimerRef.current = setTimeout(() => {
                            setBotCaption("");
                        }, 2000);
                        setIsBotSpecking(true);
                        setIsUserSpecking(false);
                    }
                    if (msg.role == 'user' && msg.transcriptType == 'partial') {
                        setIsUserSpecking(true);
                        setIsBotSpecking(false);
                    }

                    if (
                        msg.role === "assistant" &&
                        msg.transcriptType === "final" &&
                        msg.transcript.toLowerCase().includes("goodbye")) {
                        vapi.end();
                    }
                    if (msg.transcriptType === "final") {
                        setConversation(prev => {
                            // first message
                            if (prev.length === 0) {
                                return [{
                                    role: msg.role,
                                    text: msg.transcript,
                                }];
                            }
                            const lastMessage = prev[prev.length - 1];
                            // same role -> append text
                            if (lastMessage.role === msg.role) {
                                return [
                                    ...prev.slice(0, -1),
                                    {
                                        ...lastMessage,
                                        text: `${lastMessage.text} ${msg.transcript}`
                                    }
                                ];
                            }

                            return [
                                ...prev,
                                {
                                    role: msg.role,
                                    text: msg.transcript,
                                }
                            ];
                        });
                    }
                    // console.log("Assistant/Message:", msg.role, "(", msg.transcriptType, ") : \n", msg.transcript, "\n");
                }
                // console.log("Assistant/Transcriber Message:", msg);
            });


            vapi.on("error", (err) => {
                isVapiError.current = true;
                console.log("Vapi Error:", err);
                setIsSpecking(false);
                setError(true);
                toast.error("Something wrong please try again alter.");
                setTimeout(() => {
                    setInterviewPageOpen(false);
                    setOpenInterviewInstruction(false);
                    dispatch(deletePendingInterview(applicationId));
                }, 1500);
            });

            vapi.on("speech-end", () => {
                console.log("speech end")
                setIsBotSpecking(false);
                setIsUserSpecking(false);
            });

            vapi.on("call-start", () => {
                console.log("Call started");
                setIsSpecking(true)
            });

            vapi.on("call-end", () => {
                console.log("Call ended");
                setIsBotSpecking(false);
                setIsUserSpecking(false);
                setIsSpecking(false);
                setCallEnd(true);
                if (!isVapiError.current) {
                    console.log(error)
                    toast.success("Call ended. Review will be sended. Exit now");
                    handleInterviewReview();
                }

            });
        }
        fun();

    }, []);


    const [isCallingStart, setIsCallingStart] = useState(false);
    useEffect(() => {
        const handelStartVapi = async () => {
            if (isCallingStart) {
                console.log("Already in call")
                return;
            }
            setIsCallConnecting(true);
            setIsCallingStart(true);
            await vapi.start(interviewWorkflowAssistant, {
                variableValues: {
                    username: userDetails.name,
                    questions: currentInterviewData.questions,
                    jobDetails: jobDetailsForInterview,
                },
            });
        }

        handelStartVapi();

    }, [])


    const [callEnd, setCallEnd] = useState(false);
    const handleCallEnd = async () => {
        if (callEnd) {
            return;
        }
        setCallEnd(true);
        vapi.end();
        // setIsBotSpecking(false);
        // setIsUserSpecking(false);
        // setIsSpecking(false);
        // toast.success("Call ended. Review will be sended.");
        // setTimeout(() => {
        //     setInterviewPageOpen(false);
        // }, 300);
    }

    const handleInterviewReview = async () => {
        console.log(conversation);
    }


    return (
        <div className="fixed inset-0 z-50 flex flex-col bg-[#0a0f1c] text-white">

            <InterviewPageHeader applicationId={applicationId} setOpenInterviewInstruction={setOpenInterviewInstruction} />

            {/* Main Interview Area */}
            <div className="flex flex-1 flex-col items-center justify-center px-6 text-center">

                {isInterviewLoaded ? (
                    <h2 className="text-gray-400 text-lg">Loading interview...</h2>
                ) : (
                    <>
                        {/* Initial message */}
                        <h1 className="text-2xl md:text-3xl font-semibold mb-4 md:mb-6 text-center">
                            AI Interview in Progress
                        </h1>

                        <p className="text-gray-400 mb-5 md:mb-10 max-w-xl text-center text-sm md:text-base">
                            The AI interviewer will ask questions related to the job role. Listen carefully and answer clearly when prompted.
                        </p>




                        {/* <div className="relative flex items-center justify-center">

                            <span className="absolute w-28 h-28 rounded-full bg-blue-500 opacity-20 animate-ping delay-75"></span>
                            <span className="absolute w-32 h-32 rounded-full bg-blue-500 opacity-10 animate-ping delay-100"></span>

                            <div className="w-20 h-20 rounded-full bg-blue-600 flex items-center justify-center text-3xl z-10">
                                🤖
                            </div>

                        </div> */}




                        {/* Call Area */}
                        <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-8 mb-4 md:mb-10 border-0">

                            {/* //////// AI Agent ////////////*/}
                            <div className={`flex flex-col items-center gap-3 bg-[#6666664b] px-10 py-6 md:px-12 md:py-8 rounded-3xl border-[#97cbff] ${isBotSpecking ? "border-2" : ""}`}>
                                <div className="relative flex items-center justify-center border-0">

                                    {isBotSpecking && <span className="absolute w-14 h-14 md:w-18 md:h-18 rounded-full bg-blue-500 opacity-40 animate-ping delay-75"></span>}
                                    {isBotSpecking && <span className="absolute w-16 h-16 md:w-22 md:h-22 rounded-full bg-blue-500 opacity-30 animate-ping delay-100"></span>}

                                    <div className="w-20 h-20 md:w-28 md:h-28 rounded-full bg-blue-600 flex items-center justify-center text-3xl z-10">
                                        🤖
                                    </div>

                                    {/* Speaking Indicator */}
                                    <span className={`absolute bottom-0 right-0 h-3 w-3 md:w-4 md:h-4 rounded-full
                                       ${isSpecking ? `bg-green-400 animate-pulse` : `bg-gray-400`}`}></span>
                                </div>
                                <p className="text-sm text-gray-300">AI Interviewer</p>
                            </div>

                            {/* ///////// User ////////*/}
                            <div className={`flex flex-col items-center gap-3 bg-[#4848484b] px-10 py-6 md:px-12 md:py-8 rounded-3xl border-[#97cbff] ${isUserSpecking ? "border-2" : ""} `}>

                                <div className="relative flex items-center justify-center border-0">

                                    {isUserSpecking && <span className="absolute w-14 h-14 md:w-18 md:h-18 rounded-full bg-blue-500 opacity-40 animate-ping delay-75"></span>}
                                    {isUserSpecking && <span className="absolute w-16 h-16 md:w-22 md:h-22 rounded-full bg-blue-500 opacity-30 animate-ping delay-100"></span>}

                                    <div className=" w-20 h-20 md:w-28 md:h-28 rounded-full bg-blue-600 flex items-center justify-center text-3xl z-10">
                                        <img className="rounded-full" src={profilePicUrl} />

                                    </div>

                                    {/* Speaking Indicator */}
                                    <span className={`absolute bottom-0 right-0 h-3 w-3 md:w-4 md:h-4 rounded-full
                                       ${isSpecking ? `bg-green-400 animate-pulse` : `bg-gray-400`}`}></span>
                                </div>

                                <p className="text-sm text-gray-300">You</p>
                            </div>
                        </div>





                        {/* Controls */}
                        <div className="flex justify-center gap-5 border-0">

                            {/* Start Interview */}
                            {/* <button className="px-5 py-2 md:px-8 md:py-3 bg-blue-600 hover:bg-blue-700 rounded-lg font-semibold text-base md:text-lg">
                                Start Interview
                            </button> */}

                            {/* End Call */}
                            {
                                isCallConnecting ?
                                    <div className="animate-pulse text-gray-600">Connecting......</div>
                                    :
                                    <button button onClick={() => handleCallEnd()} className={`px-5 py-2 md:px-8 md:py-3 ${callEnd ? "bg-gray-600 hover:bg-gray-700" : "bg-red-600 hover:bg-red-700"} rounded-lg font-semibold text-base md:text-lg`}>
                                        End Call
                                    </button>

                            }


                        </div>
                    </>
                )}

            </div>

            {/* Live Caption Area */}
            <div className="border-t border-gray-800 p-2 bg-[#121b33] flex justify-center">


                <div className="border-0 min-h-[60px] w-full md:w-[40%] pl-2 md:pl-4 text-left flex flex-col justify-center leading-relaxed">
                    <p className="text-xs text-gray-400 mb-2">
                        Live Caption
                    </p>

                    <div className={`flex border-0 `}>
                        {/* Bot caption */}
                        <span className={`text-sm md:text-base font-medium text-[#65cbfb]`}>
                            <p className="pl-2 pr-3 inline-block rounded-md bg-gradient-to-r bg-gray-700">
                                {botCaption}
                            </p>
                        </span>
                        {/* User Caption */}
                        {/* <span className={`text-right border-0 text-sm md:text-base font-medium text-white`}>
                            <p className="pl-3 pr-2 mt-1 inline-block rounded-md bg-gradient-to-r bg-gray-700">
                                {userCaption}
                            </p>
                        </span> */}
                    </div>

                </div>

            </div>

        </div >
    );
};

export default Interview;