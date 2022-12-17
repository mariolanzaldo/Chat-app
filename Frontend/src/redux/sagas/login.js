import { put, call } from "redux-saga/effects";
import { gql } from '@apollo/client';
import client from "../../client";
import { changeLanguage } from "i18next";

import { setUser } from "../reducers/userSlice";
import { setLoginFetching, setLoginError } from "../reducers/loginSlice";

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
    // yield put(setLoginFetching());

    /* 
    
    user: {
      username
      settings: {
        language: en
      }
    }

    */
    const res = yield call(client.mutate, options);
    const user = res.data.login;

    yield call(changeLanguage, user.settings.language);

    yield put(setUser({ user }));

  } catch (err) {
    yield put(setLoginError({ err }));
  }
};

export default login;