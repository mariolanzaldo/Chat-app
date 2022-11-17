import { put, call } from "redux-saga/effects";
import { gql } from '@apollo/client';
import client from "../../client";

import { setUser } from "../reducers/userSlice";
import { setSignupFetching, signupErrorFetching } from "../reducers/signupSlice";

function* signupUser(action) {
    const options = {
        mutation: gql`
        mutation CreateUser($userInput: UserInput) {
            createUser(userInput: $userInput) {
              success
              errorMessage
            }
          }
        `,
        variables: {
            userInput: action.payload.signup,
        }
    };

    try {
        yield put(setSignupFetching());
        const res = yield call(client.mutate, options);
        const user = res.data.createUser;

        // if (!user.success) {
        //     yield put(errorDB({ user }));
        // }

        yield put(setUser({ user }));
    } catch (err) {
        yield put(signupErrorFetching(err));
    }

};

export default signupUser;
