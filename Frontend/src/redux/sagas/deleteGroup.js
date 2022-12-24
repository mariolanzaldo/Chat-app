import { gql } from "@apollo/client";
import { call, put } from "redux-saga/effects";
import client from "../../client";
import { setDefaultNotification } from "../reducers/notificationSlice";
import { setUser } from "../reducers/userSlice";


function* deleteGroup(action) {
  const options = {
    mutation: gql`
        mutation DeleteRoom($roomInput: RoomInput) {
            deleteRoom(roomInput: $roomInput) {
              success
              errorMessage
              value {
                _id
                username
                firstName
                lastName
                avatar
                contactList {
                  username
                  firstName
                  lastName
                  email
                  avatar
                }
                rooms {
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
                requests {
                  from {
                    _id
                    username
                    firstName
                    lastName
                    avatar
                  }
                  to{
                    _id
                    username
                    firstName
                    lastName
                    avatar
                  }
                }
              }
            }
          }
        `,
    variables: action.payload,
  };

  try {
    const res = yield call(client.mutate, options);
    const { value } = res.data.deleteRoom;

    yield put(setUser({ user: value }));
  } catch (error) {
    yield put(setDefaultNotification());
  }
};

export default deleteGroup;