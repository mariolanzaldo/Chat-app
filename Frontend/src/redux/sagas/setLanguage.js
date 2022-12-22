import { gql } from "@apollo/client";
import { call, put } from "redux-saga/effects";
import client from "../../client";
import { errorChangeLanguage } from "../reducers/settingSlice";
import { setUser } from "../reducers/userSlice";

function* setLanguage(action) {
  const options = {
    mutation: gql`
        mutation ChangeLanguage($userInput: UserInput) {
            changeLanguage(userInput: $userInput) {
              value {
                _id
                username
                firstName
                lastName
                email
                avatar
                settings {
                  language
                }
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
                token
              } 
            }
          }
        `,
    variables: {
      userInput: action.payload
    }
  }

  try {
    const res = yield call(client.mutate, options);

    const { changeLanguage } = res.data;
    const { value: user } = changeLanguage;

    yield put(setUser({ user }));
  } catch (err) {
    yield put(errorChangeLanguage({ err }));
  }
};

export default setLanguage;