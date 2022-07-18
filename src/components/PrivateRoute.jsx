import React from "react";
import { Navigate } from "react-router-dom";
import { FRONT_URL_ACCUEIL, FRONT_URL_LOGIN } from "../constants/urlConstants";
import { accountRoles, isAuthenticated } from "../services/accountService";

/**
 * Component PrivateRoute
 * To handle private's route, that needs authentication
 * Check also if the role is authorized to access the route
 * 
 * @author Warren B
 */
export const PrivateRoute = ({ children, roles }) => {
    const auth = isAuthenticated()
    if (!auth) return <Navigate to={FRONT_URL_LOGIN} />
    if (roles) {
        const userRoles = accountRoles()
        if (roles[0] !== userRoles[0])
            return <Navigate to={{ pathname: FRONT_URL_ACCUEIL }} />
    }
    return children
}