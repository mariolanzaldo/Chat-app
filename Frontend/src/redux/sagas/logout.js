import { gql } from "@apollo/client";
import { call, put } from "redux-saga/effects";
import client from "../../client";
import { conversationSetLogout } from "../reducers/conversationSlice";
import { userSetLogout } from "../reducers/userSlice";
import { usersSetLogout } from "../reducers/usersSlice";


function* logout(action) {
    const options = {
        mutation: gql`
        mutation Logout($cookieInput: CookieInput) {
            logout(cookieInput: $cookieInput) {
              success
              errorMessage
              value {
                username
              }
            }
          }
        `,
        variables: action.payload
    };

    client.clearStore();
    yield call(client.mutate, options);

    yield put(userSetLogout());

    yield put(usersSetLogout());

    yield put(conversationSetLogout());
};

export default logout;