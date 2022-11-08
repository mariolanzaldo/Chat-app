import { gql } from '@apollo/client';
import client from '../../client';

const GET_USER_DATA = gql`
mutation ($userInput: UserInput) {
    login(userInput: $userInput) {
      _id
      username
      firstName
      lastName
      email
      contactList
      rooms
      token
    }
  }
`;

export async function requestGetUser(action) {
  return client.query({
    query: GET_USER_DATA,
    fetchPolicy: "no-cache",
    variables: {
      userInput: action.payload.user,
    },
  })
}