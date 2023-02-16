import { gql } from '@apollo/client';
import { call, put } from 'redux-saga/effects';
import client from '../../client';
import { setGroupRoom } from '../reducers/userSlice';

function* createGroup(action) {
    const options = {
        mutation: gql`
        mutation createRoom($roomInput: RoomInput) {
            createRoom(roomInput: $roomInput) {
                _id
                name
                groupalRoom
              admin {
                    username
                }
              members {
                    username
                    joinedAt
                }
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