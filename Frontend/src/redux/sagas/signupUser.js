import { put, call } from "redux-saga/effects";
import { gql } from '@apollo/client';
import client from "../../client";
import { setSignupFetching } from "../reducers/signupSlice";
import { setNotification } from "../reducers/notificationSlice";

function* signupUser(action) {
    const options = {
        mutation: gql`
        mutation CreateUser($userInput: UserInput) {
            createUser(userInput: $userInput) {
              success
              errorMessage
            }
          }
        `,
        variables: {
            userInput: action.payload.signup,
        }
    };

    try {
        yield put(setSignupFetching());
        yield call(client.mutate, options);

        yield put(setNotification({
            error: "User created succesfully. Login to start chating",
            severity: "success"
        }));
    } catch (error) {
        yield put(setNotification({ error: error.message, severity: "error" }));
    }

};

export default signupUser;
