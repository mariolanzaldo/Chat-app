import { put, call } from "redux-saga/effects";
import { gql } from '@apollo/client';
import client from "../../client";

import { setUsers, setUsersFetching, usersErrorFetching } from "../reducers/usersSlice";

function* showFriends(action) {
    const options = {
        query: gql`
        query Query {
            users {
              username
              email
              firstName
              lastName
              rooms {
                _id
                name
              }
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

};

export default showFriends;
