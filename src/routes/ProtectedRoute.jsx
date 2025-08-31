import React, { useContext } from 'react'
import { AppContext } from '../context/AppContext'
import { Navigate } from 'react-router-dom';

const ProtectedRoute = (props) => {
    const { isLogin } = useContext(AppContext);

    return (
        isLogin ?
            props.children
            :
            <Navigate to={'/'} />

    )
}

export default ProtectedRoute