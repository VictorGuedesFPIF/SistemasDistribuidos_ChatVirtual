import { combineReducers } from "redux";
import App from "./app";
import { chatReducer as Chat } from "./chat";

export default combineReducers({
    App,
    Chat
});

