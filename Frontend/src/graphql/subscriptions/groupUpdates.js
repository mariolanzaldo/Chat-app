import { gql } from "@apollo/client";
import { CORE_ROOM_FIELDS } from "../roomFragment";

const GROUP_CHANGED = gql`
${CORE_ROOM_FIELDS}
subscription groupChanged {
    groupChanged {
      ...CoreRoomFields
    }
  }
`;

export default GROUP_CHANGED;
