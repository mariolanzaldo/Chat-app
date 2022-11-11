import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    isFetching: false,
    error: null,
    value: null,
};

const signupSlice = createSlice({
    name: 'signup',
    initialState,
    reducers: {
        setSignupFetching: (state = null) => {
            state.isFetching = true;
        },
        signupErrorFetching: (state = null, action) => {
            state.isFetching = false;
            state.error = action.payload.message
        },
        signupForm: (state = null, action) => {
            state.value = action.payload;
        },
    },
});

export const { setSignupFetching, signupErrorFetching, blurForm } = signupSlice.actions;

export default signupSlice.reducer;