import { put, call } from "redux-saga/effects";
import { gql } from '@apollo/client';
import client from "../../client";
import { changeLanguage } from "i18next";
import { setUser } from "../reducers/userSlice";
import { setNotification } from "../reducers/notificationSlice";

function* login(action) {
  const options = {
    mutation: gql`
        mutation Login($userInput: UserInput) {
            login(userInput: $userInput) {
              username
              firstName
              lastName
              avatar
              contactList {
                username
                firstName
                lastName
                email
                avatar
              }
              requests {
                from {
                  _id
                  username
                  firstName
                  lastName
                  avatar
                }
                to{
                  _id
                  username
                  firstName
                  lastName
                  avatar
                }
              }
              rooms {
                _id
                name
                groupalRoom
                admin {
                  username
                } 
                members {
                  username
                  avatar
                  joinedAt
                }
              }
              settings {
                language
              }
              token
            }
          }
        `,
    variables: {
      userInput: action.payload.user,
    }
  };

  try {
    const res = yield call(client.mutate, options);
    const user = res.data.login;

    yield call(changeLanguage, user.settings.language);

    yield put(setUser({ user }));

  } catch (error) {
    const notification = {
      error: error.message,
      severity: "error",
    }

    yield put(setNotification(notification));
  }
};

export default login;