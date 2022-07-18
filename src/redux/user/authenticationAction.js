
import { AUTHENTICATE, DECONNEXION } from "../../constants/userConstants";
/**
 * 
 * @param {string} token
 * @author Warren B
 */
export const signIn = (token) => (dispatch) => {
    dispatch({
        type: AUTHENTICATE,
        payload: token
    });
};

/**
 * Action sign out, used when the user disconnect himself from the App
 * 
 * @author Warren B
 */
export const signOut = () => (dispatch) => {
    dispatch({
        type: DECONNEXION
    });
};