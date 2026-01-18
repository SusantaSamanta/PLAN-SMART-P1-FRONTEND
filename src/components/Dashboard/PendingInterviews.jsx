import React, { useContext, useEffect } from 'react'
import { DashboardContext } from '../../context/DashboardContext';
import { RiRobot2Fill } from "react-icons/ri";
import { fetchAllPendingInterviews } from '../../../utils/dashboardDataFetch';

const PendingInterviews = () => {
    const { pendingInterviews, setPendingInterviews } = useContext(DashboardContext);

    // 🔹 Dummy data (replace with API)
    const pending1 = [
        {
            id: 1,
            title: "Junior AI Engineer",
            company: "Amazon.ai",
            attempts: 1,
            mode: "AI Interview",
            difficulty: "Easy",
            duration: "20 min",
        },
        {
            id: 2,
            title: "ML Engineer",
            company: "Google AI",
            attempts: 2,
            mode: "AI Interview",
            difficulty: "Hard",
            duration: "30 min",
        },
    ];
    const pending = [
        {
            id: 1,
            sector: "Web Development",
            role: "Freshers",
            title: "Junior Associate Web Developer",
            company: "Vara Infrovate",
            companyLogo:
                "https://upload.wikimedia.org/wikipedia/commons/0/05/Facebook_Logo_(2019).png",
            language: "English",
            attempts: 1,
            mode: "AI Interview",
            difficulty: "Easy",
            duration: "20 min",
        },
        {
            id: 2,
            sector: "Web Development",
            role: "Freshers",
            title: "Junior Associate Web Developer",
            company: "Vara Infrovate",
            companyLogo:
                "https://upload.wikimedia.org/wikipedia/commons/0/05/Facebook_Logo_(2019).png",
            language: "English",
            attempts: 1,
            mode: "AI Interview",
            difficulty: "Easy",
            duration: "20 min",
        },
    ];


    useEffect(() => {
        const call = async () => {
            const data = await fetchAllPendingInterviews();
            setPendingInterviews(data);
        }
        call();
    }, [])





    return (
        <div className="space-y-5 border-0">
            {pendingInterviews.length === 0 ? (
                <div className="flex justify-center items-center py-5">
                    <span className="text-sm text-gray-400 tracking-wide">
                        Loading Interviews…
                    </span>
                </div>
            ) : (
                pendingInterviews.map((item) => (
                    <div
                        key={item.id}
                        className="bg-[#121b33] p-3 md:p-5 rounded-xl border border-gray-700 flex flex-col gap-4 md:flex-row md:items-center md:justify-between"
                    >
                        {/* LEFT: Logo + Info */}
                        <div className="flex gap-4 items-start border-0">
                            {/* Company Logo */}
                            <img
                                src={item.companyLogo}
                                alt={item.company}
                                className="w-12 h-12 hidden md:block rounded-full object-contain bg-white border-2 "
                            />

                            {/* Text Info */}
                            <div className='border-0 w-full md:w-auto flex flex-col'>
                                <h3 className="text-white text-lg font-medium flex">
                                    <img
                                        src={item.companyLogo}
                                        alt={item.company}
                                        className="w-12 h-12  block md:hidden rounded-full object-contain bg-white border-2 "
                                    />
                                    <span className='hidden md:block'> {item.title} </span>
                                    <div className='block md:hidden ml-4 '>
                                        <span className='block md:hidden'> {item.title} </span>
                                        <p className="text-gray-400 text-sm">
                                            {item.company} • {item.sector}
                                        </p>

                                        <p className="text-xs text-gray-500 mt-1">
                                            {item.role}
                                        </p>
                                    </div>

                                </h3>
                                <p className="text-gray-400 text-sm hidden md:inline-block">
                                    {item.company} • {item.sector}
                                </p>

                                <p className="text-xs text-gray-500 mt-1 hidden md:inline-block">
                                    {item.role}
                                </p>

                                {/* Meta Badges */}
                                <div className="flex flex-wrap gap-2 mt-3">
                                    <span className="text-xs bg-blue-600/20 text-blue-400 px-2 py-1 rounded">
                                        {/* {item.mode} */}<RiRobot2Fill className='inline-block text-white mr-1 relative bottom-[2px]' />AI Interview
                                    </span>

                                    <span
                                        className={`text-xs px-2 py-1 rounded 
                                            ${item.role === "Freshers" ? "bg-green-600/20 text-green-400"
                                                : item.role === "Experienced"
                                                    ? "bg-yellow-600/20 text-yellow-400"
                                                    : "bg-red-600/20 text-red-400"
                                            }
                                        `}
                                    >
                                        {item.role == 'Freshers' ? <span>Easy</span> : <span>Medium</span>}
                                    </span>

                                    {/* <span className="text-xs bg-purple-600/20 text-purple-400 px-2 py-1 rounded">
                                        {item.duration}
                                    </span> */}

                                    <span className="text-xs bg-orange-600/20 text-orange-400 px-2 py-1 rounded">
                                        {item.language}
                                    </span>

                                    <span className="text-xs bg-yellow-700/30 text-yellow-300 px-2 py-1 rounded">
                                        Attempt {item.attempts}
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* RIGHT: Action */}
                        {/* <div className='border-0 flex justify-end'> */}
                        <button className="self-start md:self-center px-6 py-2 bg-blue-600 hover:bg-blue-700 rounded-md text-sm font-semibold cursor-pointer">
                            Start Interview
                        </button>
                        {/* </div> */}
                    </div>
                ))
            )}
        </div>
    );
};



export default PendingInterviews;