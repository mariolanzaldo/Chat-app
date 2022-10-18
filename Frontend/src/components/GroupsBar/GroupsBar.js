import BasicCard from "../common/BasicCard/BasicCard";
import { Box, Grid, Typography, IconButton } from "@mui/material";
import RefreshIcon from '@mui/icons-material/Refresh';
import SearchBar from "../common/SearchBar/SearchBar";
import CommonButton from '../common/CommonButton/CommonButton';
import { navbarStyles } from "../Navbar/styles";

const GroupsBar = () => {

    const getHeader = () => {
        const handleChange = (value) => {
            console.log(value);
        }

        const addContact = () => {
            console.log('clicked!');
        };
        return (
            <Grid item sx={navbarStyles.wrapper} >
                <SearchBar
                    placeholder="Search a group!"
                    onChange={(event) => handleChange(event.target.value)}
                />
                <Box sx={{
                    width: '170px',
                }}>
                    <CommonButton
                        variant="contained"
                        onClick={addContact}
                        size='large'
                        sx={navbarStyles.addUserButton}
                    >
                        Add
                    </CommonButton>
                    <IconButton sx={navbarStyles.icons}>
                        <RefreshIcon />
                    </IconButton>
                </Box>
            </Grid>
        );
    };

    const getContent = () => {
        return (
            <Box container>
                <Typography
                    align='center'
                    sx={{ margin: '40px 16px', color: 'rgba(0,0,0,0.6)', fontSize: '1.3rem' }}
                >
                    No groups yet!
                </Typography>
            </Box>
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