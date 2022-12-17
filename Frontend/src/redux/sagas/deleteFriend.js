import { put, call } from "redux-saga/effects";
import { gql } from '@apollo/client';
import client from "../../client";

import { setUserFetching, userErrorFetching, deleteContact } from "../reducers/userSlice";

function* deleteFrien(action) {
  console.log('enters');
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
          _id
          token
        }
      }
    }
        `,
    variables: action.payload,
  };
  try {
    // yield put(setUserFetching());
    console.log(action.payload);

    const res = yield call(client.mutate, options);
    const value = res.data.deleteFriend.value;

    yield put(deleteContact(value));
  } catch (error) {
    console.log('error saga');
    yield put(userErrorFetching(error));
  }
};

export default deleteFrien;