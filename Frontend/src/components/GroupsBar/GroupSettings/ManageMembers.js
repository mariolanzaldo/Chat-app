import * as React from 'react';
import PropTypes from 'prop-types';
import { useTheme } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { Grid, IconButton, MenuItem, Modal } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import DeleteMember from './DeleteMember';

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`full-width-tabpanel-${index}`}
            aria-labelledby={`full-width-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 0, m: 0 }}>
                    {children}
                </Box>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};

function a11yProps(index) {
    return {
        id: `full-width-tab-${index}`,
        'aria-controls': `full-width-tabpanel-${index}`,
    };
}

export default function ManageMembers({ currentChat }) {
    const theme = useTheme();
    const [value, setValue] = React.useState(0);
    const [open, setOpen] = React.useState(false);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const handleChangeIndex = (index) => {
        setValue(index);
    };

    return (
        <>
            <MenuItem onClick={() => setOpen(true)} >
                <Typography textAlign="center">
                    Manage members
                </Typography>
            </MenuItem>
            <Modal open={open} >
                <Grid container sx={{
                    position: 'relative',
                    // display: 'flex',
                    // flexDirection: 'column',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: 600,
                    bgcolor: 'background.paper',
                    boxShadow: 24,
                    p: 0,
                }}
                    rowSpacing={0}
                >
                    <Grid item xs={12}
                        sx={{
                            display: 'flex',
                            margin: 0,
                            padding: 0,
                            justifyContent: 'right',
                            height: 'auto',
                            backgroundColor: 'rgba(120, 120, 120, 1.0)',
                            // justifyItems: 'right',
                        }}
                    >
                        <IconButton
                            size='medium'
                            onClick={() => setOpen(false)}
                            sx={{
                                color: 'white'
                            }}>
                            <CloseIcon />
                        </IconButton>
                    </Grid>
                    <Grid item xs={12}>

                        <AppBar position="static">
                            <Tabs
                                value={value}
                                onChange={handleChange}
                                indicatorColor="secondary"
                                textColor="inherit"
                                variant="fullWidth"
                                aria-label="full width tabs example"
                            >
                                <Tab label="Add member" {...a11yProps(0)} />
                                <Tab label="Remove member" {...a11yProps(1)} />
                            </Tabs>
                        </AppBar>

                        <TabPanel value={value} index={0} dir={theme.direction}>
                            Add member
                        </TabPanel>
                        <TabPanel value={value} index={1} dir={theme.direction}>
                            <DeleteMember currentChat={currentChat} open={open} setOpen={setOpen} />
                        </TabPanel>
                    </Grid>
                </Grid>
            </Modal>
        </>
    );
}
// export default ManageMembers;

