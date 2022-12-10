import { Box, Button, Typography } from "@mui/material";
import { useState } from "react";
import CommonButton from "../../common/CommonButton/CommonButton";
import { useDispatch, useSelector } from "react-redux";
import { MuiChipsInput } from 'mui-chips-input';
import { useTranslation } from "react-i18next";


const AddMember = ({ currentChat, setOpen }) => {
    const { t } = useTranslation();

    const dispatch = useDispatch();
    const { contactList } = useSelector((state) => state.user.value);

    const { _id } = currentChat;
    const [chips, setChips] = useState([]);


    const handleSubmit = (event) => {
        event.preventDefault();

        const members = chips.map((user) => {
            return { username: user };
        });

        const roomInput = {
            _id,
            members,
        }
        //TODO: saga created, check if the chat service looks good to receive the data!
        dispatch({
            type: 'addMember',
            payload: { roomInput },
        });

        setOpen(false);
        setChips([]);
    };

    const handleChange = (newChips) => {
        setChips(newChips);
    };

    const handleValidation = (chip) => {
        const isValid = contactList.find((user) => user === chip);

        return {
            isError: !isValid,
            textError: `Add ${chip} to your contact list first`,
        }
    };

    return (
        <>
            <Box component="form"
                onSubmit={handleSubmit}
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    p: 1,
                }}
            >
                <Typography sx={{ textAlign: 'center' }}>{t("addMember")}</Typography>
                <Typography sx={{ textAlign: 'center' }}>{t("fillForm")}</Typography>
                <Box
                    sx={{
                        width: '70%',
                        alignSelf: 'center',
                    }}
                >
                    <MuiChipsInput
                        name="addMembers"
                        value={chips}
                        label={t("members")}
                        placeholder={t("typeUsername")}
                        helperText={chips.length > 0 ? t("doubleClick") : ""}
                        onChange={handleChange}
                        validate={handleValidation}
                        clearInputOnBlur
                        sx={{
                            width: '100%',
                            '& .MuiChipsInput-Chip': {
                                backgroundColor: 'rgba(175, 173, 222, 0.8)'
                            },
                            '& .MuiChipsInput-Chip-Editing': {
                                color: 'white'
                            }
                        }}
                    />
                </Box>
                <Box
                    sx={{
                        display: 'flex',
                        gap: '30px',
                        justifyContent: 'center',
                        padding: 1,
                    }}
                >
                    <Button
                        type='submit'
                        variant='contained'
                    >
                        {t("add")}
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
        </>
    );
};

export default AddMember;