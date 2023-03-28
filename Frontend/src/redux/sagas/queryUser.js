import { gql } from "@apollo/client";
import { call, put } from 'redux-saga/effects';
import { setUser, userErrorFetching } from '../reducers/userSlice';
import client from "../../client";

function* queryUser() {
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
                  isGroupalRoom
                  admin {
                    username
                  } 
                  members {
                    _id
                    username
                    avatar
                    joinedAt
                  }
                }
                token
            }
        }
        `,
    fetchPolicy: "no-cache",

  };
  try {
    const res = yield call(client.query, options);
    const { currentUser } = res.data;

    yield put(setUser({ user: currentUser }));

  } catch (err) {
    yield put(userErrorFetching({ err }));
  }
};

export default queryUser;