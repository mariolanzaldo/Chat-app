const { gql } = require("@apollo/client");

const MESSAGES_SUBSCRIPTION = gql`
subscription newMessage($roomId: ID) {
    newMessage(roomId: $roomId) {
      content
      isScribble
      roomId
      sendBy
      createdAt
    }
  }
`;

export default MESSAGES_SUBSCRIPTION;