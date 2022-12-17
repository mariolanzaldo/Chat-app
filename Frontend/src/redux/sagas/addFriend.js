import { put, call } from "redux-saga/effects";
import { gql } from '@apollo/client';
import client from "../../client";

import { setUserFetching, userErrorFetching, addContact, setUser } from "../reducers/userSlice";
// import { GraphQLError } from "graphql";

function* addFriend(action) {
    const options = {
        mutation: gql`
        mutation AddFriend($friendInput: FriendInput) {
            addFriend(friendInput: $friendInput) {
                from {
                    _id
                    firstName
                    lastName
                    username
                    avatar
                  }
                  to{
                    _id
                    firstName
                    lastName
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
    } catch (error) {
        yield put(userErrorFetching(error));
    }
};

export default addFriend;
