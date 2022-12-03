import { takeEvery, all, takeLatest } from "redux-saga/effects";

import login from './sagas/login';
import addFriend from './sagas/addFriend';
import signupUser from "./sagas/signupUser";
import showFriends from "./sagas/showFriends";
import deleteFriend from "./sagas/deleteFriend";
import queryUser from "./sagas/queryUser";
import newMessage from "./sagas/newMessage";
import addNewMessage from "./sagas/addNewMessage";
import setConversation from "./sagas/setConversation";
import queryMessages from "./sagas/queryMessages";
import createGroup from "./sagas/createGroup";
import deleteMember from "./sagas/deleteMember";

export function* watchLogin() {

    yield takeLatest('login', login);
};

export function* watchQueryUser() {
    yield takeLatest('authUser', queryUser);
};

export function* watchSignup() {
    yield takeEvery('signup', signupUser);
};

export function* watchQueryUsers() {
    yield takeEvery('showFriends', showFriends);
};

export function* watchAddContact() {
    yield takeEvery('addFriend', addFriend);
};

export function* watchDeleteContact() {
    yield takeEvery('deleteFriend', deleteFriend);
};

export function* watchCreateMessage() {
    yield takeEvery("createMessage", newMessage);
};

export function* watchAddMessage() {
    yield takeLatest("addNewMessage", addNewMessage);
};
export function* watchCurrentConv() {
    yield takeLatest("setConversation", setConversation);
};

export function* watchQueryMessages() {
    yield takeLatest("queryMessages", queryMessages);
};

export function* watchCreateGroup() {
    yield takeEvery("createGroup", createGroup);
}

export function* watchDeleteMembers() {
    yield takeEvery("deleteMember", deleteMember);
}

export default function* rootSaga() {
    yield all([
        watchLogin(),
        watchQueryUser(),
        watchSignup(),
        watchQueryUsers(),
        watchAddContact(),
        watchDeleteContact(),
        watchCreateMessage(),
        watchAddMessage(),
        watchCurrentConv(),
        watchQueryMessages(),
        watchCreateGroup(),
        watchDeleteMembers(),
    ]);
}