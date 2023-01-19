import { gql, useSubscription } from '@apollo/client';
import { useDispatch, useSelector } from 'react-redux';
import GroupList from './GroupList';

const GROUP_CHANGED = gql`
subscription groupChanged {
    groupChanged {
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
  }
`;

const ConvTabContent = ({ rooms }) => {

    const dispatch = useDispatch();

    const { rooms: allUserRooms, username } = useSelector((state) => state.user.value);

    useSubscription(GROUP_CHANGED, {
        onData: ({ data }) => {
            const { groupChanged } = data?.data;

            const user = groupChanged.find((user) => user.username === username);

            if (user) {
                dispatch({
                    type: 'groupChanges',
                    payload: user,
                });
            }
        },
    });

    if (rooms.length === 0) {
        return (
            <GroupList rooms={allUserRooms} />
        );
    } else {
        return (
            <GroupList rooms={rooms} />
        );
    }
};

export default ConvTabContent;