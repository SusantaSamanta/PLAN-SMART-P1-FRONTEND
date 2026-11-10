import React, { useContext } from 'react'
import { AppContext } from '../context/AppContext'
import { Navigate } from 'react-router-dom';

const ProtectedRoute = (props) => {
    const { isLogin, isLoading } = useContext(AppContext);

    if (isLoading) {
        return <Loading />
    }

    return (
        isLogin ?
            props.children
            :
            <Navigate to={'/login'} replace />

    )
}

export default ProtectedRoute





function Loading() {
    return (
        <div className="min-h-screen w-full flex flex-col items-center justify-center bg-gradient-to-br from-black via-[#020307] to-[#01041a]">

            {/* Animated loader */}
            <div className="relative flex items-center justify-center w-20 h-20">

                <div className="absolute inset-0 rounded-full border-4 border-blue-400"></div>

                <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-purple-500 border-r-indigo-500 border-b-blue-500 animate-spin"></div>

                <div className="h-10 w-10 rounded-full bg-gradient-to-br from-blue-500 via-indigo-500 to-purple-400 flex items-center justify-center shadow-lg shadow-indigo-900 ">
                    <span className="text-white text-xl">✦</span>
                </div>
            </div>

            {/* Loading text */}
            <h2 className="mt-7 text-xl font-semibold bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-400 bg-clip-text text-transparent">
                FutureVision
            </h2>

            <p className="mt-2 text-sm text-gray-500 animate-pulse">
                Preparing your creative space...
            </p>

            {/* Loading progress dots */}
            <div className="flex items-center gap-1.5 mt-5">
                <span className="w-2 h-2 rounded-full bg-blue-500 animate-bounce [animation-delay:0ms]"></span>
                <span className="w-2 h-2 rounded-full bg-indigo-500 animate-bounce [animation-delay:150ms]"></span>
                <span className="w-2 h-2 rounded-full bg-purple-400 animate-bounce [animation-delay:300ms]"></span>
            </div>

        </div>
    );

}



