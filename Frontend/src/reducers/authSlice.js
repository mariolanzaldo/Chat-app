// import { Types } from "./types";
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    username: "",
    password: "",
    userToken: null,
    isSucess: false,
    isFetching: false,
    errorMessage: "",
};

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {},
    extraReducers: {},
});

export const userSelector = state => state.user;