import BasicCard from "../common/BasicCard/BasicCard";
import { Box, Grid, Typography, IconButton, List, ListItem, ListItemText } from "@mui/material";
import SearchBar from "../common/SearchBar/SearchBar";
import CommonButton from '../common/CommonButton/CommonButton';
import { navbarStyles } from "../Navbar/styles";
import { useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';

const GroupsBar = () => {

    const { rooms } = useSelector((state) => {
        return state.user.value;

    });

    const navigate = useNavigate();

    const getHeader = () => {
        const handleChange = (value) => {
            console.log(value);
        }

        const addGroup = () => {
            console.log('clicked!');
        };

        return (
            <Grid item sx={navbarStyles.wrapper} >
                <SearchBar
                    placeholder="Search a group!"
                    onChange={(event) => handleChange(event.target.value)}
                />
                <Box sx={{
                    width: '70px',
                }}>
                    <CommonButton
                        variant="contained"
                        onClick={addGroup}
                        size='large'
                        sx={navbarStyles.addUserButton}
                    >
                        New
                    </CommonButton>
                </Box>
            </Grid>
        );
    };

    const getContent = () => {
        return (
            <List>
                {(rooms.length === 0 || !rooms) ? <Typography
                    align='center'
                    sx={{ margin: '40px 16px', color: 'rgba(0,0,0,0.6)', fontSize: '1.3rem' }}
                >
                    No groups yet!
                </Typography> : rooms.map((room) => {
                    const { _id, name } = room;
                    return (
                        <ListItem
                            button
                            key={_id}
                            onDoubleClick={() => navigate(`conversation/${_id}`)}
                        >
                            <ListItemText
                                key={_id}
                                primary={name}
                            />


                        </ListItem>
                    );
                })


                }
            </List>
        );
    };


    return (
        <>
            <BasicCard
                header={getHeader()}
                content={getContent()}
            />
        </>
    );
}

export default GroupsBar;