import { put, call } from "redux-saga/effects";
import { gql } from '@apollo/client';
import client from "../../client";
import { deleteContact } from "../reducers/userSlice";
import { setDefaultNotification } from "../reducers/notificationSlice";

function* deleteFrien(action) {
  const options = {
    mutation: gql`
    mutation DeleteFriend($friendInput: FriendInput) {
      deleteFriend(friendInput: $friendInput) {
        success
        errorMessage
        value {
          username
          contactList {
            _id
            username
            email
            firstName
            lastName
            avatar
          }
          avatar
          email
          firstName
          lastName
          rooms {
            _id
            name
            groupalRoom
            admin {
              username
            }
            members {
              _id
              username
              firstName
              lastName
              email
              joinedAt
              avatar
            }
          }
          _id
          token
          requests {
            to {
              _id
              username
              firstName
              lastName
              email
              avatar
            }
            from {
              _id
              username
              firstName
              lastName
              email
              avatar
            }
          }
          settings {
            language
          }
        }
      }
    }
        `,
    variables: action.payload,
    fetchPolicy: "no-cache",
  };
  try {
    const res = yield call(client.mutate, options);
    const value = res.data.deleteFriend.value;

    yield put(deleteContact(value));
  } catch (error) {
    yield put(setDefaultNotification());
  }
};

export default deleteFrien;