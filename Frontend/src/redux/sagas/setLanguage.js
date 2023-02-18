import { gql } from "@apollo/client";
import { call, put } from "redux-saga/effects";
import client from "../../client";
import { setDefaultNotification, setNotification } from "../reducers/notificationSlice";
import { setUser } from "../reducers/userSlice";
import { t } from 'i18next';

function* setLanguage(action) {
  const options = {
    mutation: gql`
        mutation ChangeLanguage($settingsInput: SettingsInput) {
            changeLanguage(settingsInput: $settingsInput) {
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
                    _id
                    username
                    firstName
                    lastName
                    avatar
                    joinedAt
                  }
                }
                token
              } 
            }
          }
        `,
    variables: action.payload
  }

  try {
    const res = yield call(client.mutate, options);

    const { changeLanguage } = res.data;
    const { value: user } = changeLanguage;

    yield put(setNotification({ severity: "success", error: t("languageChanged") }));
    yield put(setUser({ user }));
  } catch (err) {
    yield put(setDefaultNotification());
  }
};

export default setLanguage;