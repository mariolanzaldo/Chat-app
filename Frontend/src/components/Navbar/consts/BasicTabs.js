import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import { navbarStyles } from '../styles';
import ContactsBar from '../../ContactsBar/ContactsBar';
import ConvBar from '../../GroupsBar/ConvBar';
import { useTranslation } from 'react-i18next';

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 0, width: '45vh' }}>
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
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

export default function BasicTabs() {

    const { t } = useTranslation();
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        event.preventDefault();
        setValue(newValue);
    };

    return (
        <Box sx={navbarStyles.tabs}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs value={value} variant="fullWidth" onChange={handleChange} aria-label="basic tabs example">
                    <Tab label={t("contacts")} {...a11yProps(0)} />
                    <Tab label={t("conversations")} {...a11yProps(1)} />
                </Tabs>
            </Box>
            <TabPanel value={value} index={0}>
                <ContactsBar />

            </TabPanel>
            <TabPanel value={value} index={1}>
                <ConvBar />
            </TabPanel>

        </Box>
    );
}