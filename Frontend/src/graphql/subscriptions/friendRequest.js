import { gql } from "@apollo/client";

const FRIEND_REQUEST = gql`
subscription FriendSub {
    addFriend {
        from {
            username
            firstName
            lastName
            avatar
          }
          to {
            username
            firstName
            lastName
            avatar
          }
  }
}
`;

export default FRIEND_REQUEST;