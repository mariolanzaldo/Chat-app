import { gql } from "@apollo/client";
import { call, put } from "redux-saga/effects";
import client from "../../client";
import { userErrorFetching, newMember } from "../reducers/userSlice";

function* addMember(action) {
  const options = {
    mutation: gql`
        mutation addMember($roomInput: RoomInput) {
            addMember(roomInput: $roomInput) {
              _id
              name
              groupalRoom
              admin {
                username
              }
              members {
                username
                avatar
              }
            }
          }
        `,
    variables: action.payload,
  };

  try {
    const res = yield call(client.mutate, options);

    yield put(newMember(res.data));
  } catch (error) {
    yield put(userErrorFetching(error));
  }
};

export default addMember;