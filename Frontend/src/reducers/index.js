import { combineReducers } from "redux";
import user from "./userReducer";
import { authSlice } from "./authSlice";


export default combineReducers({ user, authSlice });