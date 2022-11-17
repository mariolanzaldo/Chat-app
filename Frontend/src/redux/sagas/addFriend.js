import { put, call } from "redux-saga/effects";
import { gql } from '@apollo/client';
import client from "../../client";

import { setUserFetching, userErrorFetching, addContact } from "../reducers/userSlice";

function* addFriend(action) {
    const options = {
        mutation: gql`
        mutation AddFriend($friendInput: FriendInput) {
            addFriend(friendInput: $friendInput) {
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
        const value = res.data.addFriend.value;

        yield put(addContact(value));
    } catch (error) {
        yield put(userErrorFetching(error));
    }
};

export default addFriend;
