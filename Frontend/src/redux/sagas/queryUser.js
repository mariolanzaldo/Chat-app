import { gql } from "@apollo/client";
import { call, put } from 'redux-saga/effects';
import { setUser, userErrorFetching } from '../reducers/userSlice';

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
                contactList {
                  username
                  firstName
                  lastName
                  email
                  avatar
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
        `,
  };
  try {
    // yield put(setUserFetching());
    const res = yield call(client.query, options);
    const { currentUser } = res.data;

    yield put(setUser({ user: currentUser }));

  } catch (err) {
    yield put(userErrorFetching({ err }));
  }
};

export default queryUser;