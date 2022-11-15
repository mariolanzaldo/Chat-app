import { put, call, takeEvery, all } from "redux-saga/effects";
import { gql } from '@apollo/client';
import client from "../client";

import { setUser, setUserFetching, userErrorFetching } from "./reducers/userSlice";
import { setLoginFetching, setLoginError, loginErrorFetching, errorDB } from "./reducers/loginSlice";
import { setSignupFetching, signupErrorFetching, blurForm } from "./reducers/signupSlice";
import { setUsers, setUsersFetching, usersErrorFetching } from "./reducers/usersSlice";

export function* queryUser(action) {
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
}

export function* watchQueryUser() {

    yield takeEvery('login', queryUser);
}

export function* signupUser(action) {
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
        const res = yield call(client.mutate, options);
        const user = res.data.createUser;

        // if (!user.success) {
        //     yield put(errorDB({ user }));
        // }

        yield put(setUser({ user }));
    } catch (err) {
        yield put(signupErrorFetching(err));
    }

}

export function* watchSignup() {
    yield takeEvery('signup', signupUser);
}

export function* showFriends(action) {
    const options = {
        query: gql`
        query Query {
            users {
              username
              email
              firstName
              lastName
              avatar
            }
          }
        `,
    };

    try {
        yield put(setUsersFetching());
        const res = yield call(client.query, options);
        const users = res.data.users;

        yield put(setUsers({ users }));
    } catch (err) {
        yield put(usersErrorFetching(err));
    }

}

export function* watchQueryUsers() {
    yield takeEvery('showFriends', showFriends);
}


export function* addContact(action) {
    const options = {
        mutation: gql`
        mutation AddFriend($friendInput: FriendInput) {
            addFriend(friendInput: $friendInput) {
                success
                errorMessage
            }
          }
        `,
        variables: action.payload,
    };
    try {
        yield put(setUserFetching());

        const res = yield call(client.mutate, options);
        const value = res.data.addFriend;

        yield put('addContact', value);
    } catch (error) {
        yield put(userErrorFetching);
    }
};

export function* watchAddContact() {
    yield takeEvery('addContact', addContact);
}

export default function* rootSaga() {
    yield all([
        watchQueryUser(),
        watchSignup(),
        watchQueryUsers(),
        watchAddContact(),
    ])
}