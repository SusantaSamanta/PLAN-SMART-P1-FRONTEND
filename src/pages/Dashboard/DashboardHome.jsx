import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AppContext } from '../../context/AppContext';

const DashboardHome = () => {
    const { isProfileComplete, setIsProfileComplete } = useContext(AppContext);

    return (
        <div className="h-full">
            {!isProfileComplete ? (
                <div className='flex flex-col items-center justify-center h-full text-center border-2 text-white'>
                    <h2 className="text-2xl font-semibold mb-3">
                        ⚠️ Complete Your Profile to Proceed
                    </h2>
                    <p className="text-gray-400 max-w-md mb-6">
                        Please fill in your personal and technical details to unlock AI interview
                        suggestions and job recommendations.
                    </p>
                    <Link
                        to="/dashboard/profile-setup"
                        className="bg-blue-600 hover:bg-blue-700 px-6 py-2 rounded-md text-white font-medium transition"
                    >
                        Complete Profile Now
                    </Link>
                </div>
            ) : (
                <>
                    <div className="w-full max-w-6xl text-left pb-10 md:p-10 border-0">

                        <h1 className="text-3xl font-bold mb-2">
                            Welcome Back 👋
                        </h1>

                        <p className="text-gray-400 mb-8">
                            Here's a quick overview of your job search and interview activity.
                        </p>

                        {/* Stats */}
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">

                            <div className="bg-[#121b33] p-4 md:p-5 rounded-xl border border-gray-700">
                                <p className="text-gray-400 text-sm">
                                    Applied Jobs
                                </p>
                                <h3 className="text-3xl font-bold mt-2">
                                    12
                                </h3>
                            </div>

                            <div className="bg-[#121b33] p-4 md:p-5 rounded-xl border border-gray-700">
                                <p className="text-gray-400 text-sm">
                                    Pending Interviews
                                </p>
                                <h3 className="text-3xl font-bold mt-2">
                                    3
                                </h3>
                            </div>

                            <div className="bg-[#121b33] p-4 md:p-5 rounded-xl border border-gray-700">
                                <p className="text-gray-400 text-sm">
                                    Completed Interviews
                                </p>
                                <h3 className="text-3xl font-bold mt-2">
                                    5
                                </h3>
                            </div>

                            <div className="bg-[#121b33] p-4 md:p-5 rounded-xl border border-gray-700">
                                <p className="text-gray-400 text-sm">
                                    Profile Status
                                </p>
                                <h3 className="text-green-400 text-xl font-bold mt-2">
                                    Complete
                                </h3>
                            </div>

                        </div>

                        {/* Recent Activity */}
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

                            {/* Latest Jobs */}
                            <div className="bg-[#121b33] p-5 rounded-xl border border-gray-700">
                                <h2 className="text-xl font-semibold mb-4">
                                    Latest Jobs
                                </h2>

                                <div className="space-y-3">
                                    <div className="border-b border-gray-700 pb-2">
                                        <p className="font-medium">
                                            Frontend Developer
                                        </p>
                                        <p className="text-sm text-gray-400">
                                            Microsoft
                                        </p>
                                    </div>

                                    <div className="border-b border-gray-700 pb-2">
                                        <p className="font-medium">
                                            React Developer
                                        </p>
                                        <p className="text-sm text-gray-400">
                                            Google
                                        </p>
                                    </div>

                                    <div>
                                        <p className="font-medium">
                                            Full Stack Developer
                                        </p>
                                        <p className="text-sm text-gray-400">
                                            Amazon
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Upcoming Interviews */}
                            <div className="bg-[#121b33] p-5 rounded-xl border border-gray-700">
                                <h2 className="text-xl font-semibold mb-4">
                                    Pending Interviews
                                </h2>

                                <div className="space-y-3">
                                    <div className="border-b border-gray-700 pb-2">
                                        <p className="font-medium">
                                            Junior Web Developer
                                        </p>
                                        <p className="text-sm text-yellow-400">
                                            Pending
                                        </p>
                                    </div>

                                    <div className="border-b border-gray-700 pb-2">
                                        <p className="font-medium">
                                            MERN Stack Developer
                                        </p>
                                        <p className="text-sm text-yellow-400">
                                            Pending
                                        </p>
                                    </div>

                                    <div>
                                        <p className="font-medium">
                                            React Intern
                                        </p>
                                        <p className="text-sm text-yellow-400">
                                            Pending
                                        </p>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

export default DashboardHome;
