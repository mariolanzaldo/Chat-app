import * as React from 'react';
import { Avatar, Button, CssBaseline, Link, Grid, Box, Typography, Container, TextField, Paper } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { useDispatch } from "react-redux";
import { validator } from '../validator/validator';
import useForm from '../hooks/useForm';
import { createAvatar } from "@dicebear/avatars";
import * as style from '@dicebear/adventurer-neutral';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

export default function Signup() {

    const { t } = useTranslation();

    const dispatch = useDispatch();

    const navigate = useNavigate();

    const paperStyle = { padding: 20, height: '85vh', width: 380, margin: "20px auto" };

    const initState = {
        username: "",
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: "",
    };

    const submit = (userInput) => {
        userInput.avatar = createAvatar(style, {
            dataUri: true,
            size: 1280,
        });
        if (!errors.username && !errors.email && !errors.password &&
            !errors.confirmPassword && !errors.firstName && !errors.lastName) {
            dispatch({
                type: "signup",
                payload: {
                    signup: userInput,
                }
            });

            navigate('/login');
        }


    };

    const {
        handleChange,
        handleSubmit,
        handleBlur,
        state,
        errors,
    } = useForm({
        initState,
        callback: submit,
        validator
    });

    return (
        <Paper elevation={5} style={paperStyle}>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }
                    }
                >
                    <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography level="h1" component="h1" variant="h5" sx={{ mb: 2 }}>
                        {t("signup")}
                    </Typography>
                </Box>
                <Box component="form" onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                required
                                label={t("username")}
                                placeholder='Username'
                                name="username"
                                defaultValue={state.username}
                                onChange={handleChange}
                                error={errors.username ? true : false}
                                helperText={errors.username}
                                onBlur={handleBlur}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                required
                                label={t("firstName")}
                                name="firstName"
                                defaultValue={state.firstName}
                                onChange={handleChange}
                                error={errors.firstName ? true : false}
                                helperText={errors.firstName}
                                onBlur={handleBlur}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                required
                                label={t("lastName")}
                                name="lastName"
                                defaultValue={state.lastName}
                                onChange={handleChange}
                                error={errors.lastName ? true : false}
                                helperText={errors.lastName}
                                onBlur={handleBlur}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                required
                                label={t("email")}
                                name="email"
                                defaultValue={state.email}
                                onChange={handleChange}
                                error={errors.email ? true : false}
                                helperText={errors.email}
                                onBlur={handleBlur}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                required
                                label={t("password")}
                                name="password"
                                type="password"
                                defaultValue={state.password}
                                onChange={handleChange}
                                error={errors.password ? true : false}
                                helperText={errors.password}
                                onBlur={handleBlur}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                required
                                label={t("confirmPassword")}
                                name="confirmPassword"
                                type="password"
                                defaultValue={state.confirmPassword}
                                onChange={handleChange}
                                error={errors.confirmPassword ? true : false}
                                helperText={errors.confirmPassword}
                                onBlur={handleBlur}
                            />
                        </Grid>
                    </Grid>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 1, mb: 1, backgroundColor: '#3f51b5' }}
                    >
                        {t("signup")}
                    </Button>
                    <Grid container>
                        <Grid item textAlign='center'>
                            {t("alreadyHave")}
                            <Link href="login">
                                {t("login")}
                            </Link>
                        </Grid>
                    </Grid>
                </Box>
            </Container>
        </Paper>
    );
}
