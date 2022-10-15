import * as React from 'react';
import { Avatar, Button, CssBaseline, Link, Grid, Box, Typography, Container, TextField, Paper } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { validator } from '../validator/validator';
import useForm from '../hooks/useForm';

export default function App() {

    const paperStyle = { padding: 20, height: '85vh', width: 380, margin: "20px auto" };

    const initState = {
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
    };

    const submit = (values) => {
        console.log(values);
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
                        Sign up
                    </Typography>
                </Box>
                <Box component="form" onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                required
                                label="Username"
                                placeholder='Username'
                                name="username"
                                defaultValue={state.username}
                                onChange={handleChange}
                                error={errors.username ? true : false}
                                helperText={errors.username}
                                onBlur={handleBlur}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                required
                                label="Email"
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
                                label="Password"
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
                                label="Confirm Password"
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
                        Sign up
                    </Button>
                    <Grid container>
                        <Grid item textAlign='center'>
                            Already have an account?
                            <Link href="login">
                                Login
                            </Link>
                        </Grid>
                    </Grid>
                </Box>

            </Container>
        </Paper>
    );
}
