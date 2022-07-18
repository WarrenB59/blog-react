import { AUTHENTICATE, DECONNEXION } from "../../constants/userConstants";
import { isAuthenticated } from "../../services/accountService";

/**
 * initial state: is logged check if the user is already authenticated when opening the Application
 * @author Warren B
 */
const initialValues = {
    logged: isAuthenticated()
};

/**
 * A simple function switch, to decide what function reducer to use depending on the action
 * 
 * @param {object} state
 * @param {string} action
 * @author Warren B
 */

const authenticationReducer = (state = initialValues, action) => {
    switch (action.type) {
        case AUTHENTICATE:
            sessionStorage.setItem('token', action.payload);
            return {
                ...state,
                logged: true,
            };
        case DECONNEXION:
            sessionStorage.clear();
            return {
                ...state,
                logged: false,
            };
            
        default:
            return state;
    }
};

export default authenticationReducer;