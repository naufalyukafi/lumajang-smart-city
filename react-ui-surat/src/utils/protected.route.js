import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { useSelector } from "react-redux";

export const ProtectedRoute = ({ allowed = [""] }) => {
    const user = useSelector((state) => state.user)
    const isLoggedIn = () => {
        if (user.isAuth) {
            if (allowed.includes(user.value.authorize)) {
                // console.log("Akses allowed");
                return true;
            } else {
                // console.log("Akses Terbatas");
                return false;
            }
        } else {
            return user.isAuth;
        }
    }

    return (
        <>
            {isLoggedIn() ? <Outlet /> : <Navigate to="/login" replace />}
        </>
    )
}