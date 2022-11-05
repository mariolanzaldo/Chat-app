import { put, call, takeEvery, all } from "redux-saga/effects";
import { gql } from '@apollo/client';
import client from "./client";

export function* queryUser(action) {
    const options = {
        query: gql`
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

    const res = yield call(client.query, options);
    const user = res.data.user;
    yield put({ type: "CHANGE_USER", payload: { user } });
}

export function* watchQueryUser() {
    yield takeEvery("QUERY_USER", queryUser);
}

export default function* rootSaga() {
    yield all([
        watchQueryUser,
    ])
}