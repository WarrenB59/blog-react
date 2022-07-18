import jwt_decode from "jwt-decode";

const TOKEN_NAME = 'token';

/**
 * To save the JWT token using for the back end requests
 * Save in the session storage
 * 
 * @param {string} token: to save
 * @author Warren B
 */
export function setToken(token) {
    sessionStorage.setItem(TOKEN_NAME, token);
}

/**
 * To get the JWT token back-end saved in the sessionStorage
 * 
 * @return {string} token
 * @author Warren B
 */
export function getToken() {
    return sessionStorage.getItem(TOKEN_NAME);
}

/**
 * Delete the token from the sessionStorage
 * 
 * @author Warren B
 */
export function removeToken() {
    sessionStorage.removeItem(TOKEN_NAME);
}

/**
 * Get the payload of the JWT Token (with expiration date, login and roles)
 * 
 * @return {object} payload of the token
 * @author Warren B
 */
export function getPayloadToken() {
    const decoded = decodeToken();
    return decoded;
}

/**
 * Decode the JWT Token to get all the visible part (header and payload)
 * 
 * @return {object} the decoded token
 * @author Warren B 
 */
function decodeToken() {
    const token = getToken();
    return jwt_decode(token);
}