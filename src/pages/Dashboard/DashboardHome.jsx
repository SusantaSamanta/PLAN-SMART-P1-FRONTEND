import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AppContext } from '../../context/AppContext';

const DashboardHome = () => {
    const { isProfileComplete, setIsProfileComplete } = useContext(AppContext);

    return (
        <div className="flex flex-col items-center justify-center h-[80vh] text-center text-white">
            {!isProfileComplete ? (
                <>
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
                </>
            ) : (
                <>
                    <h2 className="text-2xl font-semibold">Welcome back, Susanta!</h2>
                </>
            )}
        </div>
    );
};

export default DashboardHome;
