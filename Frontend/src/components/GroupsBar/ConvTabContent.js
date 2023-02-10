import { gql, useSubscription } from '@apollo/client';
import { useDispatch, useSelector } from 'react-redux';
import GroupList from './GroupList';

const GROUP_CHANGED = gql`
subscription groupChanged {
    groupChanged {
      _id
      name
      groupalRoom
      admin {
        username
      }
      members {
        _id
        username
        avatar
        joinedAt
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

      const user = groupChanged.members.find((user) => user.username === username);

      if (user) {
        dispatch({
          type: 'groupChanges',
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