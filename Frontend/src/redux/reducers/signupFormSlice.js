import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    username: "",
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
};

const signupFormSlice = createSlice({
    name: 'signupForm',
    initialState,
    reducers: {
        onblur: (state, action) => {

        }
    },
});

export default signupFormSlice.reducer;