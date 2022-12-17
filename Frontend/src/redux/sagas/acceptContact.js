import { gql } from "@apollo/client";
import { call, put } from "redux-saga/effects";
import client from "../../client";
import { acceptFriend, userErrorFetching } from "../reducers/userSlice";

function* acceptContact(action) {
  const options = {
    mutation: gql`
    mutation AcceptFriend($friendInput: FriendInput) {
      acceptFriend(friendInput: $friendInput) {
        success
        errorMessage
        value {
          _id
          username
          firstName
          lastName
          email
          settings {
            language
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
          avatar
          contactList {
            username
            avatar
            firstName
            lastName
            email
          }
          rooms {
            _id
            name
            admin {
              username
            }
            groupalRoom
            members {
              username
              joinedAt
            }
          }
        }
      }
    }
        `,
    variables: action.payload
  }
  try {
    const res = yield call(client.mutate, options);
    const { value } = res.data.acceptFriend;

    yield put(acceptFriend(value));
  } catch (error) {
    yield put(userErrorFetching(error));
  }
};

export default acceptContact;