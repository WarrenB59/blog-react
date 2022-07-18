import { getPayloadToken, getToken } from "./tokenService";

/**
 * Pour retourner true ou false sur la connexion User
 * @author Warren B
 * @return void
 */
export function isAuthenticated(){
    try {
        const token = getToken();
        const payload = getPayloadToken();
        const roles = payload.roles;
        const expirationDate = payload.exp;
        const login = payload.username;
        const dateNow = new Date();
        return (
            token && roles.length > 0 && login && expirationDate < dateNow.getTime()
            // token && login && expirationDate < dateNow.getTime()
        );
    } catch {
        return false;
    }
}

    /**
     * To get all the roles of the current user
     * 
     * @return {Array} roles of the current user
     * @author Warren B
     */
    export function accountRoles() {
        const payload = getPayloadToken()
        return payload.roles
    }