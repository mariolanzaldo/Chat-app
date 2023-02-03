import { put, call } from "redux-saga/effects";
import { gql } from '@apollo/client';
import client from "../../client";
import { t } from 'i18next';
// import { setUserFetching, userErrorFetching } from "../reducers/userSlice";
import { setNotification } from "../reducers/notificationSlice";
// import { GraphQLError } from "graphql";

function* addFriend(action) {
    const options = {
        mutation: gql`
        mutation AddFriend($friendInput: FriendInput) {
            addFriend(friendInput: $friendInput) {
                from {
                    _id
                    firstName
                    lastName
                    username
                    avatar
                  }
                  to{
                    _id
                    firstName
                    lastName
                    username
                    avatar
                  }
            }
          }
        `,
        variables: action.payload,
        fetchPolicy: "no-cache",
    };
    try {
        yield call(client.mutate, options);

        yield put(setNotification({ error: t("requestSent"), severity: "success" }));
    } catch (error) {
        if (error.message === "Request already sent") {
            yield put(setNotification({ error: t("addFriendError4"), severity: "error" }));
        } else if (error.message === "User not found") {
            yield put(setNotification({ error: t("userNotFound"), severity: "error" }));
        } else {
            yield put(setNotification({ error: error.message, severity: "error" }));
        }
    }
};

export default addFriend;
