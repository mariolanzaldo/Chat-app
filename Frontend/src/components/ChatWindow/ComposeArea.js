import { Box, IconButton, TextField } from "@mui/material";
import SendIcon from '@mui/icons-material/Send';

const ComposeArea = () => {
    return (
        <Box
            container
            sx={{
                display: "flex",
                width: "100%",
                height: "90px",
                padding: "0px",
                gap: '100px',
                alignItems: "center",
            }}
        >
            <TextField
                type="text"
                direction="column"
                placeholder="Type a message"
                multiline={true}
                // noWrap

                sx={{
                    backgroundColor: "rgb(240, 240, 240)",
                    borderRadius: "25px",
                    flexGrow: 2,
                    paddingLeft: "2px",
                    width: "125vh",
                    maxHeight: "70px",
                    margin: 0,
                    whiteSpace: "normal",
                    overflow: "auto",
                    "& fieldset": {
                        border: 'none',
                    },
                    '&::-webkit-scrollbar': {
                        width: '0.4em',
                    },
                    '&::-webkit-scrollbar-track': {
                        boxShadow: 'inset 0 0 6px rgba(0,0,0,0.00)',
                        webkitBoxShadow: 'inset 0 0 6px rgba(,0,0,0.00)',

                    },
                    '&::-webkit-scrollbar-thumb': {
                        backgroundColor: 'blue',
                        outline: '1px solid slategrey'
                    }
                }}
            />
            <IconButton
                variant="contained"
                color="primary"
                sx={{
                    minWidth: "50px",
                    width: "50px",
                    height: "50px",
                    flexGrow: 0,
                    backgroundColor: "rgb(240, 240, 240)",
                }}
            >
                <SendIcon />
            </IconButton>
        </Box >
    );
};

export default ComposeArea;