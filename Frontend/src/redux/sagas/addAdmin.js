import { gql } from "@apollo/client";
import { call, put } from "redux-saga/effects";
import client from "../../client";
import { CORE_ROOM_FIELDS } from "../../graphql/roomFragment";
import { newAdmin, userErrorFetching } from '../reducers/userSlice';


function* addAdmin(action) {
    const options = {
        mutation: gql`
        ${CORE_ROOM_FIELDS}
            mutation addAdmin($roomInput: RoomInput) {
             addAdmin(roomInput: $roomInput) {
                ...CoreRoomFields
                }
            }
        `,
        variables: action.payload,
    }

    try {
        const res = yield call(client.mutate, options);

        yield put(newAdmin(res.data));
    } catch (error) {
        yield put(userErrorFetching(error));
    }
};

export default addAdmin;