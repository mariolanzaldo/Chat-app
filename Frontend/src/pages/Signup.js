import * as React from 'react';
import { Avatar, Button, CssBaseline, Link, Grid, Box, Typography, Container, FormControl, useFormControl, FormHelperText, OutlinedInput, TextField } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Paper } from '@mui/material';
import validate from 'validator';

const theme = createTheme();

function UsernameHelper() {
    const { focused } = useFormControl() || {};

    const helperText = React.useMemo(() => {
        if (focused) {
            return 'This field is beign focused';
        }

        return '';
    }, [focused]);

    return <FormHelperText>{helperText}</FormHelperText>
}

function EmailHelper() {
    const focused = useFormControl() || {};
    focused.onBlur();

    const helperText = React.useMemo(() => {
        if (focused) {
            return 'This field is beign focused';
        }

        return '';
    }, [focused]);

    return <FormHelperText>{helperText}</FormHelperText>
}

function PasswordHelper() {
    const { focused } = useFormControl() || {};

    const helperText = React.useMemo(() => {
        if (focused) {
            return 'This field is beign focused';
        }

        return '';
    }, [focused]);

    return <FormHelperText>{helperText}</FormHelperText>
}

function ConfirmPasswordHelper() {
    const { focused } = useFormControl() || {};

    const helperText = React.useMemo(() => {
        if (focused) {
            return 'This field is beign focused';
        }

        return '';
    }, [focused]);

    return <FormHelperText>{helperText}</FormHelperText>
}

function validator(value, fieldName) {
    let result = true;
    if (fieldName === 'email') {
        if (value !== '') {
            const regEx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            result = regEx.test(String(value).toLowerCase());
            console.log(validate.isEmail(value));
            return result;
        }

        return result;
    }
}

export default function SignUp() {
    const paperStyle = { padding: 20, height: '80vh', width: 280, margin: "20px auto" };

    let actualState = {
        email: '',
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        //validator
        //HTTP request to auth service
        console.log({
            username: data.get('username'),
            password: data.get('password'),
            email: data.get('email'),
            confirmPassword: data.get('confirmPassword'),
        });
    };

    const handleOnBlur = (event) => {
        event.preventDefault();
        actualState.email = event.target.value;

        const isValid = validator(actualState.email, 'email');
        if (isValid) {
            console.log('valid email');
        } else {
            console.log('invalid email');
        }
    }

    return (
        <ThemeProvider theme={theme}>
            <Paper elevation={5} style={paperStyle}>
                <Container component="main" maxWidth="xs">
                    <CssBaseline />
                    <Box
                        sx={{
                            marginTop: 0,
                            padding: 0,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}
                    >
                        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                            <LockOutlinedIcon />
                        </Avatar>
                        <Typography component="h1" variant="h5">
                            Sign up
                        </Typography>
                        <Box component="form" noValidate autoComplete='off' onSubmit={handleSubmit} sx={{ mt: 3 }} >
                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                    <FormControl>
                                        <OutlinedInput
                                            name="username"
                                            required
                                            fullWidth
                                            id="username"
                                            placeholder="Username"
                                            autoFocus
                                        />
                                        <UsernameHelper />
                                    </FormControl>

                                </Grid>
                                <Grid item xs={12}>
                                    <FormControl>
                                        <OutlinedInput
                                            required
                                            fullWidth
                                            id="email"
                                            placeholder="Email Address"
                                            name="email"
                                            onBlur={handleOnBlur}
                                        />
                                        <EmailHelper />
                                    </FormControl>
                                </Grid>
                                <Grid item xs={12}>
                                    <FormControl>
                                        <OutlinedInput
                                            required
                                            fullWidth
                                            name="password"
                                            placeholder="Password"
                                            type="password"
                                            id="password"
                                        />
                                        <PasswordHelper />
                                    </FormControl>

                                </Grid>
                                <Grid item xs={12}>
                                    <FormControl>
                                        <OutlinedInput
                                            required
                                            fullWidth
                                            name="confirmPassword"
                                            placeholder="Confirm password"
                                            type="password"
                                            id="confirmPassword"
                                        />
                                        <ConfirmPasswordHelper />
                                    </FormControl>
                                </Grid>
                            </Grid>
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 2, mb: 1, backgroundColor: '#3f51b5' }}
                            >
                                Sign up
                            </Button>
                            <Grid container justifyContent="center">
                                <Grid item textAlign="center">
                                    Already have an account?
                                    <Link href="/login">
                                        Login
                                    </Link>
                                </Grid>
                            </Grid>
                        </Box>
                    </Box>
                </Container>
            </Paper>
        </ThemeProvider >
    );
}

// import { SettingsInputAntenna } from "@mui/icons-material";
// import { FormHelperText, useFormControl } from "@mui/material";
// import Box from "@mui/material/Box";
// import TextField from "@mui/material/TextField";
// import { useState, useMemo } from "react";

// function isValidEmail(email: string) {
//   return email.includes("@");
// }

// function Helper() {
//   const { focused } = useFormControl() || {};
//   const text = useMemo(() => {
//     if (focused) {
//       return "hello";
//     }
//     return "";
//   }, [focused]);
//   return <FormHelperText>{text}</FormHelperText>;
// }

// const SignupPage = () => {
//   const [email, setEmail] = useState("");
//   const handleChange = (ev: any) => {
//     setEmail(ev.target.value);
//     if (!isValidEmail(ev.target.value)) {
//       console.log("not valid email dude!");
//     }
//   };
//   return (
//     <div>
//       <TextField
//         id="email-field"
//         label="Email"
//         value={email}
//         placeholder="Your email"
//         onChange={handleChange}
//       />
//       <Helper />
//     </div>
//   );
// };

// export default SignupPage;


