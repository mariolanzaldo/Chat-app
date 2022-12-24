import { put } from "redux-saga/effects";
import { deleteNotification } from "../reducers/notificationSlice";

function* eraseNotification(action) {
    yield put(deleteNotification(action.payload));
};

export default eraseNotification;