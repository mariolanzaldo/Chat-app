import { gql } from "@apollo/client";
import { call, put } from 'redux-saga/effects';
import { setUser, setUserFetching, userErrorFetching } from '../reducers/userSlice';

import client from "../../client";

function* queryUser(action) {
    const options = {
        query: gql`
        query {
            currentUser{
                _id
                username
                firstName
                lastName
                avatar
                contactList
                rooms {
                  _id
                  name
                  #members {
                    #username
                  #}
                }
                token
            }
        }
        `,
    };
    try {
        // yield put(setUserFetching());
        const res = yield call(client.query, options);
        const { currentUser } = res.data;

        yield put(setUser({ user: currentUser }));

    } catch (err) {
        //TODO: change fetching  to false
        yield put(userErrorFetching({ err }));
    }
};

export default queryUser;