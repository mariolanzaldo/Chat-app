import { put } from "redux-saga/effects";
import { setUser } from "../reducers/userSlice";

function* watchRequestFriendAccepted(action) {
    const user = action.payload;
    yield put(setUser({ user }));
};

export default watchRequestFriendAccepted;