import { Box, Button, IconButton, Modal, TextField, Typography } from "@mui/material";
import SendIcon from '@mui/icons-material/Send';
import GestureIcon from '@mui/icons-material/Gesture';
import { useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { contactStyles } from "../ContactsBar/styles";
import CommonButton from "../common/CommonButton/CommonButton";
import Canvas from "./Canvas";
import { useTranslation } from "react-i18next";


const ComposeArea = () => {

    const { t } = useTranslation();

    const dispatch = useDispatch();

    const [message, setMessage] = useState("");
    const [open, setOpen] = useState(false);
    const [scribble, setScribble] = useState("");

    const { roomId } = useParams();

    const { username } = useSelector((state) => {
        return state.user.value;
    });

    const handleSubmit = (event) => {
        event.preventDefault();
        let messageInput;
        if (message.length > 0) {
            if (scribble) {
                messageInput = {
                    roomId,
                    content: message,
                    sendBy: username,
                    isScribble: true,
                };
            } else {
                messageInput = {
                    roomId,
                    content: message,
                    sendBy: username,
                    isScribble: false,
                };
            }

            dispatch({
                type: "createMessage",
                payload: messageInput,
            });

            setMessage("");
            setScribble("");
        }
    };

    const handleChange = (event) => {
        const text = event.target.value;

        setMessage(text);
    };

    const handleClick = (event) => {

        setOpen(true);
    };

    const handleScribble = (event) => {
        event.preventDefault();
        const canva = document.querySelector('canvas');

        const image = canva.toDataURL("image/png").toString();

        setMessage(image);
        setScribble(image);
        setOpen(false);
    };


    return (
        <>
            <Box
                component="form"
                onSubmit={handleSubmit}
                sx={{
                    display: 'flex',
                    width: "100%",
                    height: "90px",
                    padding: "0px",
                    gap: '15px',
                    alignItems: "center",
                }}
            >

                <TextField
                    direction="column"
                    placeholder={t("typeMessage")}
                    //multiline={true}
                    value={message}
                    onChange={handleChange}
                    required
                    sx={{
                        backgroundColor: "rgb(240, 240, 240)",
                        borderRadius: "25px",
                        flexGrow: 2,
                        paddingLeft: "2px",
                        width: "125vh",
                        maxHeight: "70px",
                        margin: 0,
                        whiteSpace: "normal",
                        overflowY: 'scroll',
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
                            backgroundColor: 'rgba(145, 136, 153, 0.91)',
                            outline: '1px solid slategrey'
                        }
                    }}
                />
                <IconButton
                    variant="contained"
                    color="primary"
                    onClick={handleClick}
                    sx={{
                        minWidth: "50px",
                        width: "50px",
                        height: "50px",
                        flexGrow: 0,
                        backgroundColor: "rgb(240, 240, 240)",
                    }}
                >
                    <GestureIcon />
                </IconButton>
                <IconButton
                    variant="contained"
                    color="primary"
                    type="submit"
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

            <Modal open={open} onSubmit={handleScribble}>
                <Box component="form" sx={contactStyles.scribble}>
                    <Typography
                        variant='h6'
                        component='h2'
                    >
                        {t("scribble")}
                    </Typography>
                    <Typography sx={{ mt: 1 }}>
                        {t("scribbleInstruction")}
                    </Typography>

                    <Box
                        sx={{
                            margin: 1,
                        }}
                    >
                        <Canvas
                            width={600}
                            height={300}
                            id='canvas'
                        />
                    </Box>

                    <Box sx={contactStyles.buttons}>
                        <Button
                            type='submit'
                            variant='contained'
                        >
                            {t("submit")}
                        </Button>
                        <CommonButton
                            variant="outlined"
                            onClick={(event) => {
                                event.preventDefault();
                                return setOpen(false)
                            }}
                        >
                            {t("cancel")}
                        </CommonButton>
                    </Box>
                </Box>
            </Modal>
        </>
    );
};

export default ComposeArea;