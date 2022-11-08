import { combineReducers } from "redux";
import user from "./userReducer";
import authReducer from "./authSlice";

const authSliceReducer = authReducer.reducer;
export default combineReducers({ user, authSliceReducer });