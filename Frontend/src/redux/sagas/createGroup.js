import { gql } from '@apollo/client';
import { call, put } from 'redux-saga/effects';
import client from '../../client';
import { CORE_ROOM_FIELDS } from '../../graphql/roomFragment';
import { setGroupRoom } from '../reducers/userSlice';

function* createGroup(action) {
    const options = {
        mutation: gql`
        ${CORE_ROOM_FIELDS}
        mutation createRoom($roomInput: RoomInput) {
            createRoom(roomInput: $roomInput) {
                ...CoreRoomFields
            }
        }
        `,
        variables: {
            roomInput: action.payload.roomInput
        },
        fetchPolicy: "no-cache",

    };

    const res = yield call(client.mutate, options);
    const value = res.data.createRoom;

    yield put(setGroupRoom(value));
};

export default createGroup;