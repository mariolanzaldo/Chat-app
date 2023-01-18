import { gql, useSubscription } from '@apollo/client';
import { useDispatch, useSelector } from 'react-redux';
import ContactList from "./ContactList";

const FRIEND_REQUEST_ACCEPTED = gql`
subscription FriendRequestAccepted {
    friendRequestAccepted {
    _id
    username
      firstName
      lastName
      email
      
      avatar
      contactList {
        _id
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
          email
          avatar
        }
        to {
          _id
          username
          firstName
          lastName
          email
          avatar
        }
      }
      rooms {
        _id
        name
        groupalRoom
        admin {
          _id
          username
          lastName
          firstName
          email
          joinedAt
          avatar
        }
        members {
          _id
          username
          firstName
          lastName
          email
          joinedAt
          avatar
        }
      }  
      token
      settings {
        language
      }
    }
  }`;

const TabContent = ({ users }) => {

    const { username, contactList } = useSelector((state) => state.user.value);

    const dispatch = useDispatch();

    const { data, loading } = useSubscription(FRIEND_REQUEST_ACCEPTED, {
        onData: ({ data }) => {
            if (data?.data.friendRequestAccepted.username === username) {
                dispatch({
                    type: "requestAccepted",
                    payload: data?.data.friendRequestAccepted
                });
            }
        },
    });

    if (users.length === 0) {
        return (
            <ContactList contacts={contactList} />
        );
    } else {
        return (
            <ContactList contacts={users} />
        );
    }
};

export default TabContent;