import { gql } from "@apollo/client";
import { call, put } from "redux-saga/effects";
import client from "../../client";
import { setDefaultNotification } from "../reducers/notificationSlice";
import { rejectFriend } from "../reducers/userSlice";

function* rejectContact(action) {
  const options = {
    mutation: gql`
        mutation rejectFriend($friendInput: FriendInput) {
            rejectFriend(friendInput: $friendInput) {
              success
              errorMessage
              value {
                _id
                username
                firstName
                lastName
                email
                avatar
                settings {
                  language
                }
                contactList {
                  _id
                  username
                  firstName
                  lastName
                  email
                  avatar
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
                rooms {
                  _id
                  name
                  admin {
                    username
                  }
                  isGroupalRoom
                  members {
                    username
                    joinedAt
                  }
                }
              }
            }
          }
        `,
    variables: action.payload
  };

  try {
    const res = yield call(client.mutate, options);

    const user = res.data.rejectFriend?.value;

    yield put(rejectFriend(user));

  } catch (error) {
    yield put(setDefaultNotification());
  }
};

export default rejectContact;