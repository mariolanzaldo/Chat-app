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
        },
        setGroupRoom: (state = null, action) => {
            state.isFetching = false;
            state.value.rooms = [...state.value.rooms, action.payload];
        },
        removeMember: (state = null, action) => {
            state.isFetching = false;
            const oldRooms = state.value.rooms;

            const updatedRooms = oldRooms.map((room) => {
                if (room._id === action.payload.deleteMember._id) {
                    room.members = action.payload.deleteMember.members;
                };

                return room;
            });

            state.value.rooms = updatedRooms;
        },
        newMember: (state = null, action) => {
            state.isFetching = false;

            const oldRooms = state.value.rooms;

            const updatedRooms = oldRooms.map((room) => {
                if (room._id === action.payload.addMember._id) {
                    room.members = action.payload.addMember.members;
                }

                return room;
            });

            state.value.rooms = updatedRooms;
        },
        newAdmin: (state = null, action) => {
            state.isFetching = false;

            const oldRooms = state.value.rooms;

            const updatedRooms = oldRooms.map((room) => {
                if (room._id === action.payload.addAdmin._id) {
                    room.admin = action.payload.addAdmin.admin;
                }

                return room;
            });

            state.value.rooms = updatedRooms;
        },
        removeAdmin: (state = null, action) => {
            state.isFetching = false;

            const oldRooms = state.value.rooms;

            const updatedRooms = oldRooms.map((room) => {
                if (room._id === action.payload.addAdmin._id) {
                    room.admin = action.payload.addAdmin.admin;
                }

                return room;
            });

            state.value.rooms = updatedRooms;
        },
        userSetLogout: (state = null, action) => {
            state.isFetching = false;
            state.value = null;
        },
    },
});

export const {
    setUser,
    setUserFetching,
    userErrorFetching,
    addContact,
    deleteContact,
    setGroupRoom,
    removeMember,
    newMember,
    newAdmin,
    removeAdmin,
    userSetLogout,
} = userSlice.actions;

export default userSlice.reducer;