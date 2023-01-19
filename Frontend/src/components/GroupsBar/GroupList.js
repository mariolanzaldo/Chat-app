import { List, ListItem, ListItemText } from "@mui/material";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import GroupMenu from "./GroupMenu";


const GroupList = ({ rooms }) => {

    const dispatch = useDispatch();

    const navigate = useNavigate();

    return (
        <List spacing={2}>
            {rooms.map((item) => {
                const { _id, name, groupalRoom } = item;

                if (groupalRoom) {
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
                            onClick={(event) => {
                                if (event.target.className.includes('MuiTypography-root MuiTypography-body1 MuiListItemText-primary')) {
                                    dispatch({
                                        type: 'setConversation',
                                        payload: {
                                            _id
                                        },
                                    });

                                    navigate(`conversation/${_id}`);
                                }
                            }}
                        >
                            <ListItemText>{name}</ListItemText>

                            <GroupMenu id={_id} />
                        </ListItem>
                    );
                } else if (!groupalRoom) {
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
                            onClick={(event) => {
                                event.preventDefault();
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
                        </ListItem>
                    );
                }
            })}
        </List>
    );
};

export default GroupList;