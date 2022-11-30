import { Box, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ConvTabContent from "./ConvTabContent";
import ConvTabHeader from "./ConvTabHeader";

const ConvBar = () => {
    const dispatch = useDispatch();

    const { rooms } = useSelector((state) => state.user.value);

    const [open, setOpen] = useState(false);

    if (rooms && rooms.length > 0) {
        return (
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    width: '100%',
                    margin: 0,
                    padding: 0,
                }}
            >
                <ConvTabHeader open={open} setOpen={setOpen} />
                <ConvTabContent rooms={rooms} />
            </Box>
        );
    } else if (rooms && rooms.length === 0) {
        return (
            <Box>
                <ConvTabHeader open={open} setOpen={setOpen} />
                <Typography> No conversations yet!</Typography>
            </Box>
        )
    }


}

export default ConvBar;