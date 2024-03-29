import { Box, Button, FormControl, Grid, InputLabel, MenuItem, Select, Typography } from "@mui/material";
import { t } from "i18next";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { contactStyles } from "../ContactsBar/styles";


const LanguageSettings = ({ setOpen }) => {

    const { i18n } = useTranslation();

    const dispatch = useDispatch();

    const [selectedLanguage, setSelectedLanguage] = useState("en");

    const handleChange = (event) => {
        event.preventDefault();
        setSelectedLanguage(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        i18n.changeLanguage(selectedLanguage);

        const userInput = {
            settingsInput: {
                language: selectedLanguage,
            }
        };

        dispatch({
            type: "setLanguage",
            payload: userInput,
        });

        setOpen(false);
    };

    return (
        <Grid
            component="form"
            onSubmit={handleSubmit}
            sx={{
                display: 'flex',
                flexDirection: 'column',
                p: 1,
            }}
        >
            <Typography sx={{ textAlign: "center" }}>{t("preferredLanguage")}</Typography>
            <FormControl
                sx={{
                    margin: 1
                }}
            >
                <InputLabel >{t("language")}</InputLabel>
                <Select
                    label="Language"
                    value={selectedLanguage}
                    onChange={handleChange}
                >
                    <MenuItem value={"en"}>&#8288;{t("english")}</MenuItem>
                    <MenuItem value={"es"}>&#8288;{t("spanish")}</MenuItem>
                    <MenuItem value={"fr"}>&#8288;{t("french")}</MenuItem>
                </Select>
            </FormControl>
            <Box
                sx={contactStyles.buttons}
            >
                <Button
                    variant="contained"
                    type="submit"
                >
                    {t("apply")}
                </Button>
            </Box>
        </Grid>
    );
};

export default LanguageSettings;