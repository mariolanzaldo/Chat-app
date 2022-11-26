import { put } from "redux-saga/effects";
import { addMessage } from "../reducers/conversationSlice";

function* addNewMessage(action) {
    // const message = action.payload;
    yield put(addMessage(action.payload));
};

export default addNewMessage;