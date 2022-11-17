import { put, call } from "redux-saga/effects";
import { gql } from '@apollo/client';
import client from "../../client";

import { setUserFetching, userErrorFetching, deleteContact } from "../reducers/userSlice";

function* deleteFriend(action) {
    const options = {
        mutation: gql`
        mutation DeleteFriend($friendInput: FriendInput) {
            deleteFriend(friendInput: $friendInput) {
              success
              errorMessage
              value {
                username
                contactList
                avatar
                email
                firstName
                lastName
                token
              }
            }
          }
        `,
        variables: action.payload,
    };
    try {
        yield put(setUserFetching());

        const res = yield call(client.mutate, options);
        const value = res.data.deleteFriend.value;

        yield put(deleteContact(value));

    } catch (error) {
        console.log('error saga');
        yield put(userErrorFetching(error));
    }
};

export default deleteFriend;