import { put, call, takeEvery, all } from "redux-saga/effects";
import { gql } from '@apollo/client';
import { login, errorFetching } from "./reducers/authSlice";
import client from "../client";

export function* queryUser(action) {
    const options = {
        mutation: gql`
        mutation ($userInput: UserInput) {
            login(userInput: $userInput) {
              _id
              username
              firstName
              lastName
              email
              contactList
              rooms
              token
            }
          }
        `,
        variables: {
            userInput: action.payload.user,
        }
    };

    try {
        const res = yield call(client.mutate, options);
        const user = res.data.user;
        console.log(user);
        // yield put({ type: "login", payload: { user } });

    } catch (err) {
        yield put(errorFetching(err));
    }
}

export function* watchQueryUser() {

    yield takeEvery('login', queryUser);
}

export default function* rootSaga() {
    yield all([
        watchQueryUser(),
    ])
}