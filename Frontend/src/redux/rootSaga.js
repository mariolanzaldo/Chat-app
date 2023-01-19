import { takeEvery, all, takeLatest } from "redux-saga/effects";

import login from './sagas/login';
import addFrien from './sagas/addFriend';
import signupUser from "./sagas/signupUser";
import deleteContact from "./sagas/deleteFriend";
import queryUser from "./sagas/queryUser";
import newMessage from "./sagas/newMessage";
import addNewMessage from "./sagas/addNewMessage";
import setConversation from "./sagas/setConversation";
import queryMessages from "./sagas/queryMessages";
import createGroup from "./sagas/createGroup";
import deleteMember from "./sagas/deleteMember";
import addMember from "./sagas/addMember";
import addAdmin from "./sagas/addAdmin";
import deleteAdmin from "./sagas/deleteAdmin";
import leaveGroup from "./sagas/leaveGroup";
import deleteGroup from "./sagas/deleteGroup";
import logout from "./sagas/logout";
import setLanguage from "./sagas/setLanguage";
import rejectContact from "./sagas/rejectContact";
import acceptContact from "./sagas/acceptContact";
import addNewRequest from "./sagas/addNewRequest";
import newScribble from "./sagas/newScribble";
import eraseNotification from "./sagas/eraseNotification";
import checkUsername from "./sagas/checkUsername";
import checkEmail from "./sagas/checkEmail";
import friendRequestAccepted from "./sagas/friendRequestAccepted";
import deletedFrom from "./sagas/deletedFrom";
import groupChanges from "./sagas/groupChanges";

export function* watchLogin() {

    yield takeLatest('login', login);
};

export function* watchQueryUser() {
    yield takeLatest('authUser', queryUser);
};

export function* watchSignup() {
    yield takeEvery('signup', signupUser);
};

export function* watchAddContact() {
    yield takeEvery('addFriend', addFrien);
};

export function* watchDeleteContact() {
    yield takeEvery('deleteFriend', deleteContact);
};

export function* watchCreateMessage() {
    yield takeEvery("createMessage", newMessage);
};

export function* watchCreateScribble() {
    yield takeEvery("createScribble", newScribble);
}

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
};

export function* watchDeleteMembers() {
    yield takeEvery("deleteMember", deleteMember);
};

export function* watchAddMembers() {
    yield takeEvery("addMember", addMember);
};

export function* watchAddAdmin() {
    yield takeEvery("addAdmin", addAdmin);
};

export function* watchDeleteAdmin() {
    yield takeEvery("deleteAdmin", deleteAdmin);
};

export function* watchLeaveGroup() {
    yield takeEvery("leaveGroup", leaveGroup);
};

export function* watchDeleteGroup() {
    yield takeEvery("deleteGroup", deleteGroup);
};

export function* watchLogout() {
    yield takeLatest("logout", logout);
};

export function* watchSetLanguage() {
    yield takeEvery("setLanguage", setLanguage);
};

export function* watchAcceptFriend() {
    yield takeEvery("acceptContact", acceptContact);
};

export function* watchRejectFriend() {
    yield takeEvery("rejectFriend", rejectContact);
};

export function* watchAddNewRequest() {
    yield takeEvery("addNewRequest", addNewRequest);
};

export function* watchCleanNotification() {
    yield takeLatest("cleanNotification", eraseNotification);
};

export function* watchUsernameExistence() {
    yield takeLatest("usernameExistence", checkUsername);
};

export function* watchEmailExistence() {
    yield takeLatest("emailExistence", checkEmail);
};

export function* watchRequestFriendAccepted() {
    yield takeEvery("requestAccepted", friendRequestAccepted);
};

export function* watchDeletedFromContact() {
    yield takeEvery("deletedFromContact", deletedFrom);
};

export function* watchGroupChanges() {
    yield takeEvery("groupChanges", groupChanges);
};

export default function* rootSaga() {
    yield all([
        watchLogin(),
        watchQueryUser(),
        watchSignup(),
        watchAddContact(),
        watchDeleteContact(),
        watchCreateMessage(),
        watchCreateScribble(),
        watchAddMessage(),
        watchCurrentConv(),
        watchQueryMessages(),
        watchCreateGroup(),
        watchDeleteMembers(),
        watchAddMembers(),
        watchRequestFriendAccepted(),
        watchAddAdmin(),
        watchDeleteAdmin(),
        watchLeaveGroup(),
        watchDeleteGroup(),
        watchLogout(),
        watchSetLanguage(),
        watchAddNewRequest(),
        watchAcceptFriend(),
        watchRejectFriend(),
        watchCleanNotification(),
        watchUsernameExistence(),
        watchEmailExistence(),
        watchDeletedFromContact(),
        watchGroupChanges(),
    ]);
}