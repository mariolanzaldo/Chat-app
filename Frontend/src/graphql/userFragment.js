import { gql } from '@apollo/client';

export const CORE_USER_FIELDS = gql`
           fragment CoreUserFields on User {
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
              isGroupalRoom
              members {
                username
                firstName
                lastName
                avatar
                joinedAt
              }
            }
           }
`;