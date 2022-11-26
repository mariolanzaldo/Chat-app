import Delete from '@mui/icons-material/Delete';
import { IconButton, List, ListItem, ListItemText } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

const ConvTabContent = ({ rooms }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    //TODO: Work on delete conversations if the conversation is groupal
    return (
        <List spacing={2}>
            {rooms.map((item) => {
                const { _id, name } = item;
                return (
                    <ListItem
                        button
                        key={name}
                        sx={{
                            display: 'flex',
                            flexDirection: 'row',
                            padding: '0 0 0 10px',
                            width: '98%',
                        }}
                        onClick={() => {
                            dispatch({
                                type: 'setConversation',
                                payload: {
                                    _id
                                },
                            });

                            navigate(`conversation/${_id}`);
                        }}
                    >

                        <ListItemText>{name}</ListItemText>
                        <IconButton>
                            <Delete />
                        </IconButton>
                    </ListItem>

                );
            })}
        </List>
    );
};

export default ConvTabContent;