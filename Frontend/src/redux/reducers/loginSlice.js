// import { Types } from "./types";
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    // username: "",
    // password: "",
    // isSucess: false,
    isFetching: false,
    error: null,
};

const loginSlice = createSlice({
    name: 'login',
    initialState,
    reducers: {
        setLoginFetching: (state = null, action) => {
            state.isFetching = true;
        },
        setLoginError: (state = null, action) => {
            state.error = action.payload.error;
        },
        loginErrorFetching: (state, action) => {
            state.isFetching = false;
            state.error = action.payload.message;
        },
        errorDB: (state = null, action) => {
            if (action.payload.user) {
                state.errorMessage = action.payload.user.errorMessage;
            }
        },
    },
});

export const { setLoginFetching, setLoginError, loginErrorFetching, errorDB } = loginSlice.actions;

export default loginSlice.reducer;