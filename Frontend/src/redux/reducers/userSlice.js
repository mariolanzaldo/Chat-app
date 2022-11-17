import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    isFetching: false,
    error: null,
    value: null,
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser: (state = null, action) => {
            state.isFetching = false;
            state.value = action.payload.user;
        },
        setUserFetching: (state = null) => {
            state.isFetching = true;
        },
        userErrorFetching: (state = null, action) => {
            state.isFetching = false;
            state.error = action.payload.message
        },
        addContact: (state = null, action) => {
            state.isFetching = false;
            state.value = action.payload;
        },
        deleteContact: (state = null, action) => {
            state.isFetching = false;
            state.value = action.payload;
        }
    },
});

export const { setUser, setUserFetching, userErrorFetching, addContact, deleteContact } = userSlice.actions;

export default userSlice.reducer;