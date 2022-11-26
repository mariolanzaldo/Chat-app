import { gql } from "@apollo/client";
import { call, put } from "redux-saga/effects";
import client from "../../client";
import { conversationErrorFetching } from '../reducers/conversationSlice';

function* newMessage(action) {
    const options = {
        mutation: gql`
        mutation createMessage($messageInput: MessageInput) {
            createMessage(messageInput: $messageInput) {
                _id
                roomId
                sendBy
                content
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
        yield put(conversationErrorFetching(err));
    }

};

export default newMessage;