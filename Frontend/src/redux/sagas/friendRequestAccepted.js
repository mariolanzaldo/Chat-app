import { put } from "redux-saga/effects";
import { setUser } from "../reducers/userSlice";
import { setNotification } from "../reducers/notificationSlice";
import { t } from "i18next";

function* watchRequestFriendAccepted(action) {
    const user = action.payload;
    yield put(setUser({ user }));
    yield put(setNotification({ error: t('friendRequestAccepted'), severity: "success" }));
};

export default watchRequestFriendAccepted;