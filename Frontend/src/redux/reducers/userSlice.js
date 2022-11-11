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
            state.value = action.payload.user;
        },
    },
});

export const { setUser } = userSlice.actions;

export default userSlice.reducer;