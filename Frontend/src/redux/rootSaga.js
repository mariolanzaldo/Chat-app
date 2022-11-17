import { takeEvery, all } from "redux-saga/effects";

import queryUser from './sagas/queryUser';
import addFriend from './sagas/addFriend';
import signupUser from "./sagas/signupUser";
import showFriends from "./sagas/showFriends";
import deleteFriend from "./sagas/deleteFriend";

export function* watchQueryUser() {

    yield takeEvery('login', queryUser);
}

export function* watchSignup() {
    yield takeEvery('signup', signupUser);
}

export function* watchQueryUsers() {
    yield takeEvery('showFriends', showFriends);
}

export function* watchAddContact() {
    yield takeEvery('addFriend', addFriend);
}

export function* watchDeleteContact() {
    yield takeEvery('deleteFriend', deleteFriend);
}

export default function* rootSaga() {
    yield all([
        watchQueryUser(),
        watchSignup(),
        watchQueryUsers(),
        watchAddContact(),
        watchDeleteContact(),
    ]);
}