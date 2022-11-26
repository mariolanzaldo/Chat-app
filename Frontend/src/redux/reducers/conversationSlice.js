import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    isFetching: false,
    error: null,
    currentConversation: null,
    value: [],
};

const conversationSlice = createSlice({
    name: 'messages',
    initialState,
    reducers: {
        addMessage: (state = null, action) => {
            state.isFetching = false;
            state.value = [...state.value, action.payload]
        },
        conversationErrorFetching: (state = null, action) => {
            state.isFetching = false;
            state.error = action.payload;
        },
        currentConversation: (state = null, action) => {
            state.currentConversation = action.payload;
        },
        getRoomMessages: (state = null, action) => {
            state.value = action.payload;
        },
    },
});

export const { addMessage, conversationErrorFetching, currentConversation, getRoomMessages } = conversationSlice.actions;

export default conversationSlice.reducer;