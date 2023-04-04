import { Box, Button, Grid, IconButton, Modal, TextField, Typography } from "@mui/material";
import SendIcon from '@mui/icons-material/Send';
import GestureIcon from '@mui/icons-material/Gesture';
import { useEffect, useState } from 'react';
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { contactStyles } from "../ContactsBar/styles";
import Canvas from "./Canvas";
import { useTranslation } from "react-i18next";
import { chatWindowStyles } from "./styles";


const ComposeArea = () => {

    const { t } = useTranslation();

    const dispatch = useDispatch();

    const [message, setMessage] = useState("");
    const [open, setOpen] = useState(false);
    const [isError, setIsError] = useState(false);

    const { roomId } = useParams();

    useEffect(() => {
        setMessage("")
    }, [roomId]);

    const handleSubmit = (event) => {
        event.preventDefault();

        if (message.length > 0 && message.trim() !== "") {
            const messageInput = {
                roomId,
                content: message,
                isScribble: false,
            };

            dispatch({
                type: "createMessage",
                payload: messageInput,
            });

            setMessage("");
        }
    };

    const handleChange = (event) => {
        event.preventDefault();
        const text = event.target.value;

        setMessage(text);
    };

    const handleClick = (event) => {
        event.preventDefault();

        setOpen(true);
    };

    const handleScribble = (event) => {
        event.preventDefault();
        const canva = document.querySelector('canvas');

        const image = canva.toDataURL("image/png").toString();

        const messageInput = {
            roomId,
            content: image,
            isScribble: true,
        };

        if (image.length < 92000) {
            dispatch({
                type: "createScribble",
                payload: messageInput,
            });
            setIsError(false);
            setOpen(false);

        } else {
            const ctx = canva.getContext("2d");
            ctx.clearRect(0, 0, 430, 280);
            setIsError(true);
        }
    };

    return (
        <>
            <Grid
                component="form"
                onSubmit={handleSubmit}
                display='flex'
                height="97%"
                alignItems="center"
                gap='15px'
            >
                <TextField
                    direction="column"
                    placeholder={t("typeMessage")}
                    value={message}
                    onChange={handleChange}
                    inputProps={{
                        maxLength: 5000,
                    }}
                    required
                    sx={chatWindowStyles.textInput}
                />
                <IconButton
                    variant="contained"
                    color="primary"
                    onClick={handleClick}
                    sx={chatWindowStyles.sendScribbleButton}
                >
                    <GestureIcon />
                </IconButton>
                <IconButton
                    variant="contained"
                    color="primary"
                    type="submit"
                    sx={chatWindowStyles.sendMessageButton}
                >
                    <SendIcon />
                </IconButton>
            </Grid>

            <Modal open={open} onSubmit={handleScribble}>
                <Box component="form" sx={chatWindowStyles.scribble}>
                    <Typography
                        variant='h6'
                        component='h2'
                        textAlign='center'
                    >
                        {t("scribble")}
                    </Typography>
                    <Typography
                        mt={1}
                        textAlign='center'
                    >
                        {t("scribbleInstruction")}
                    </Typography>

                    <Box
                        m={1}
                        display='flex'
                    >
                        <Canvas
                            width={430}
                            height={280}
                            id='canvas'
                        />{
                            isError ? <Typography color='red'>{t("scribbleError")}</Typography> : null
                        }
                    </Box>

                    <Box sx={contactStyles.buttons}>
                        <Button
                            type='submit'
                            variant='contained'
                        >
                            {t("submit")}
                        </Button>
                        <Button
                            variant="outlined"
                            onClick={(event) => {
                                event.preventDefault();
                                setIsError(false);
                                return setOpen(false)
                            }}
                        >
                            {t("cancel")}
                        </Button>
                    </Box>
                </Box>
            </Modal>
        </>
    );
};

export default ComposeArea;