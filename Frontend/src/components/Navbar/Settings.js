import { MenuItem } from "@mui/material";
import { useTranslation } from "react-i18next";


const Settings = () => {

    const { t } = useTranslation();

    const handleSettings = (event) => {
        event.preventDefault();


    };

    //TODO: not finished yet!
    return (
        <MenuItem
            onClick={handleSettings}
        >
            {t("settings")}
        </MenuItem>
    );
};

export default Settings;