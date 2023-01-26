import { Grid, List, ListItem, ListItemText } from "@mui/material";
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

                return (
                    <ListItem
                        button
                        key={name}
                        sx={{
                            padding: '0 0 0 5px',
                            justifyContent: "center",
                            justifyItems: "center",
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
                        <Grid container>
                            <Grid item xs={10}>
                                <ListItemText>{name}</ListItemText>
                            </Grid>
                            <Grid item xs={2}>
                                {groupalRoom ? (<GroupMenu id={_id} />) : null}
                            </Grid>
                        </Grid>

                    </ListItem>
                );
            })}
        </List >
    );
};

export default GroupList;