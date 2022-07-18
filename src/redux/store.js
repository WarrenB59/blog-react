import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import { combineReducers, createStore, applyMiddleware } from "redux";
import { articleReducer } from "./articles/articleReducer";
import authenticationReducer from "./user/authenticationReducer";

const rootReducer = combineReducers({articleReducer, authenticationReducer});

export const store = createStore(
    rootReducer,
    composeWithDevTools(applyMiddleware(thunk))
)

export default function configureStore() {
    return createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)))
}