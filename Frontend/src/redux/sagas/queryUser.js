import { put, call } from "redux-saga/effects";
import { gql } from '@apollo/client';
import client from "../../client";

import { setUser } from "../reducers/userSlice";
import { setLoginFetching, setLoginError } from "../reducers/loginSlice";

function* queryUser(action) {
    const options = {
        mutation: gql`
        mutation Login($userInput: UserInput) {
            login(userInput: $userInput) {
              username
              firstName
              lastName
              avatar
              contactList
              #rooms {
                #_id
                #name
                #members {
                  #username
                #}
              #}
              token
            }
          }
        `,
        variables: {
            userInput: action.payload.user,
        }
    };

    try {
        yield put(setLoginFetching());
        const res = yield call(client.mutate, options);
        const user = res.data.login;
        yield put(setUser({ user }));

    } catch (err) {
        yield put(setLoginError({ err }));
    }
};

export default queryUser;