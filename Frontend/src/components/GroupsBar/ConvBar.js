import { Grid, Typography } from "@mui/material";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import ConvTabContent from "./ConvTabContent";
import ConvTabHeader from "./ConvTabHeader";

const ConvBar = () => {

    const { t } = useTranslation();

    const { rooms } = useSelector((state) => state.user.value);

    const [open, setOpen] = useState(false);
    const [search, setSearch] = useState(rooms);
    const [currentRooms, setCurrentRooms] = useState([]);

    const filterData = (value) => {
        const loweredCaseValue = value.toLowerCase().trim();

        if (loweredCaseValue === "") setCurrentRooms(search);
        else {
            const filteredData = search.filter((item) => {
                const loweredCaseItem = item.name.toLowerCase().trim()
                return loweredCaseItem.includes(loweredCaseValue);
            });

            setCurrentRooms(filteredData);
        }
    }

    if (rooms && rooms.length > 0) {
        return (
            <Grid
                container
                flexDirection='column'
            >
                <ConvTabHeader open={open} setOpen={setOpen} filterData={filterData} />
                <ConvTabContent rooms={currentRooms} />
            </Grid>
        );
    } else if (rooms && rooms.length === 0) {
        return (
            <Grid
                container
                flexDirection='column'
            >
                <ConvTabHeader open={open} setOpen={setOpen} />
                <Typography>{t("noConversations")}</Typography>
            </Grid>
        )
    }
};

export default ConvBar;