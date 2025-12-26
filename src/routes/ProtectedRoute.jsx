import React, { useContext } from 'react'
import { AppContext } from '../context/AppContext'
import { Navigate } from 'react-router-dom';

const ProtectedRoute = (props) => {
    const { isLogin, isLoading } = useContext(AppContext);

    if (isLoading) {
        return <div className="text-black text-3xl flex justify-center items-center h-screen">Loading...</div>
    }

    return (
        isLogin ?
            props.children
            :
            <Navigate to={'/login'} replace/>

    )
}

export default ProtectedRoute






