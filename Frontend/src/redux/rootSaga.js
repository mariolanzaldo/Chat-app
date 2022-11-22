import { takeEvery, all, takeLatest } from "redux-saga/effects";

import login from './sagas/login';
import addFriend from './sagas/addFriend';
import signupUser from "./sagas/signupUser";
import showFriends from "./sagas/showFriends";
import deleteFriend from "./sagas/deleteFriend";
import queryUser from "./sagas/queryUser";

export function* watchLogin() {

    yield takeLatest('login', login);
}

export function* watchQueryUser() {
    yield takeLatest('authUser', queryUser);
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
        watchLogin(),
        watchQueryUser(),
        watchSignup(),
        watchQueryUsers(),
        watchAddContact(),
        watchDeleteContact(),
    ]);
}