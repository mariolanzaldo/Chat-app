import { gql } from "@apollo/client";
import { CORE_USER_FIELDS } from "../userFragment";


const FRIEND_REQUEST_ACCEPTED = gql`
${CORE_USER_FIELDS}
subscription friendRequestAccepted {
    friendRequestAccepted {
        ...CoreUserFields
      token 
    }
  }`;

export default FRIEND_REQUEST_ACCEPTED;
