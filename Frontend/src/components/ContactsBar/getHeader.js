import { navbarStyles } from '../Navbar/styles';
import CommonButton from '../common/CommonButton/CommonButton';
import { Box, Grid } from '@mui/material';
import SearchBar from "../common/SearchBar/SearchBar";

const getHeader = ([open, setOpen]) => {
    const handleSearch = (value) => {
        console.log(value);
    };

    const addContact = (event) => {
        event.preventDefault();
        setOpen(true);
    };

    return (
        <Grid item sx={navbarStyles.wrapper} >
            <SearchBar
                placeholder="Search a friend!"
                onChange={(event) => handleSearch(event.target.value)}
            />
            <Box sx={{
                width: '70px',
            }}>
                <CommonButton
                    variant="contained"
                    onClick={addContact}
                    size='large'
                    sx={navbarStyles.addUserButton}
                >
                    Add
                </CommonButton >
            </Box>
        </Grid>
    );
};

export default getHeader;