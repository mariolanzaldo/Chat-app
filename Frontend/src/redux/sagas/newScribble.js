import { gql } from "@apollo/client";
import { t } from "i18next";
import { call, put } from "redux-saga/effects";
import client from "../../client";
import { setNotification } from "../reducers/notificationSlice";
// import { conversationErrorFetching } from '../reducers/conversationSlice';

function* newScribble(action) {
    const options = {
        mutation: gql`
        mutation createMessage($messageInput: MessageInput) {
            createMessage(messageInput: $messageInput) {
                _id
                roomId
                sendBy
                content
                isScribble
            }
          }  
        `,
        variables: {
            messageInput: action.payload,
        }
    };
    try {
        yield call(client.mutate, options);
    } catch (err) {
        console.log(action.payload.content.length);
        console.log(err);
        yield put(setNotification({ error: t("errorSendMessage"), severity: "warning" }));

    }

};

export default newScribble;