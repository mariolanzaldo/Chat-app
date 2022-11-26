import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    isFetching: false,
    error: null,
    value: null,
};

const usersSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
        setUsers: (state = null, action) => {
            state.isFetching = false;
            state.value = action.payload.users;
        },
        setUsersFetching: (state = null) => {
            state.isFetching = true;
        },
        usersErrorFetching: (state = null, action) => {
            state.isFetching = false;
            state.error = action.payload.message
        },
    },
});

export const { setUsers, setUsersFetching, usersErrorFetching } = usersSlice.actions;

export default usersSlice.reducer;