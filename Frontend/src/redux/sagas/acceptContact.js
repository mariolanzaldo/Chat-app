import { gql } from "@apollo/client";
import { call, put } from "redux-saga/effects";
import client from "../../client";
import { CORE_USER_FIELDS } from "../../graphql/userFragment";
import { acceptFriend, userErrorFetching } from "../reducers/userSlice";

function* acceptContact(action) {
  const options = {
    mutation: gql`
    ${CORE_USER_FIELDS}
    mutation AcceptFriend($friendInput: FriendInput) {
      acceptFriend(friendInput: $friendInput) {
        success
        errorMessage
        value {
         ...CoreUserFields
        }
      }
    }
        `,
    variables: action.payload,
    fetchPolicy: "network-only"
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