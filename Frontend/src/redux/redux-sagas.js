import { put, call, takeEvery, all } from "redux-saga/effects";
import { gql } from '@apollo/client';
import client from "../client";

import { setUser } from "./reducers/userSlice";
import { setLoginFetching, setLoginError, loginErrorFetching, errorDB } from "./reducers/loginSlice";
import { setSignupFetching, signupErrorFetching, blurForm } from "./reducers/signupSlice";

export function* queryUser(action) {
    const options = {
        mutation: gql`
        mutation Login($userInput: UserInput) {
            login(userInput: $userInput) {
              username
              firstName
              lastName
              contactList
              #rooms {
                #_id
                #name
                #members {
                  #username
                #}
              #}
              token
            }
          }
        `,
        variables: {
            userInput: action.payload.user,
        }
    };

    try {
        yield put(setLoginFetching());
        const res = yield call(client.mutate, options);
        const user = res.data.login;
        yield put(setUser({ user }));

    } catch (err) {
        yield put(setLoginError({ err }));
    }
}

export function* signupUser(action) {
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

}

export function* watchQueryUser() {

    yield takeEvery('login', queryUser);
}

export function* watchSignup() {
    yield takeEvery('signup', signupUser);
}


export default function* rootSaga() {
    yield all([
        watchQueryUser(),
        watchSignup(),
    ])
}