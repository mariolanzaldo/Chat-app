// import { Types } from "./types";
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    // username: "",
    // password: "",
    isSucess: false,
    isFetching: false,
    errorMessage: "",
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        login: (state = null, action) => {
            state.isFetching = true;
            // state.username = action.payload.user.username;
            // state.password = action.payload.user.password;
        },
        errorFetching: (state, err) => {
            console.log(state);
            state.isFetching = false;
            state.isSucess = false;
            state.errorMessage = err.message;
        }
    },
    // extraReducers: {},
});

export const userSelector = state => state.user;

export const { login, errorFetching } = authSlice.actions;

export default authSlice;