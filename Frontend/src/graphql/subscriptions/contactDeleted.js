import { gql } from "@apollo/client";
import { CORE_USER_FIELDS } from "../userFragment";

const CONTACT_DELETED = gql`
${CORE_USER_FIELDS}
  subscription deleteContact {
    deleteContact {
     ...CoreUserFields
      token
    }
  }
  `;

export default CONTACT_DELETED;