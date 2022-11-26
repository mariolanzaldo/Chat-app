import { gql } from "@apollo/client";
import { call, put } from "redux-saga/effects";
import client from "../../client";
import { conversationErrorFetching, getRoomMessages } from "../reducers/conversationSlice";

function* queryMessages(action) {
    const options = {
        query: gql`
        query queryMessages ($_id: String) {
            messages (_id: $_id) {
              _id
              content
              roomId
              sendBy
              createdAt
            }
          }
        `,
        variables: action.payload,
    };

    try {
        const res = yield call(client.query, options);
        const { messages } = res.data;

        yield put(getRoomMessages(messages));

    } catch (err) {
        yield put(conversationErrorFetching({ err }));
    }




    // const message = action.payload;
    // yield put(addMessage(action.payload));

    yield null;
};

export default queryMessages;