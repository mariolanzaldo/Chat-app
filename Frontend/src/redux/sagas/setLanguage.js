import { gql } from "@apollo/client";
import { call, put } from "redux-saga/effects";
import client from "../../client";
import { setDefaultNotification, setNotification } from "../reducers/notificationSlice";
import { setUser } from "../reducers/userSlice";
import { t } from 'i18next';
import { CORE_USER_FIELDS } from "../../graphql/userFragment";

function* setLanguage(action) {
  const options = {
    mutation: gql`
    ${CORE_USER_FIELDS}
        mutation ChangeLanguage($settingsInput: SettingsInput) {
            changeLanguage(settingsInput: $settingsInput) {
              value {
                ...CoreUserFields
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