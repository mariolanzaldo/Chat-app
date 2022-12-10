import { gql } from "@apollo/client";
import { call, put } from "redux-saga/effects";
import client from "../../client";
import { removeAdmin, userErrorFetching } from '../reducers/userSlice';


function* deleteAdmin(action) {
    const options = {
        mutation: gql`
        mutation deleteAdmin($roomInput: RoomInput) {
            deleteAdmin(roomInput: $roomInput) {
              _id
              name
              groupalRoom
              admin {
                username
              }
              members {
                username
              }
            }
          }
        `,
        variables: action.payload,
    }

    try {
        const res = yield call(client.mutate, options);
        console.log(res.data);
        yield put(removeAdmin(res.data));
    } catch (error) {
        yield put(userErrorFetching(error));
    }
};

export default deleteAdmin;