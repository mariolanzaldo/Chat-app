import { blue } from '@mui/material/colors';
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
    palette: {
        primary: {
            main: blue[500]
        }
    },
    components: {
        MuiChip: {
            styleOverrides: {
                root: {
                    backgroundColor: 'rgba(175, 173, 222, 0.8)',
                    fontSize: '14px',
                    color: 'whitesmoke',
                    fontWeight: 'bold'
                },
            }
        },
        MuiAppBar: {
            styleOverrides: {
                root: {
                    position: 'fixed',

                }
            }
        },
        MuiTypography: {
            styleOverrides: {
                root: {
                    width: '100%',
                    fontFamily: 'Helvetica'
                }
            }
        },
        MuiList: {
            styleOverrides: {
                root: {
                    width: '100%',
                    height: '100%',
                },
            }
        },
        MuiListItem: {
            styleOverrides: {
                root: {
                    width: '100%',
                },
                gutters: {
                    width: '100%',
                    justifyContent: "center",
                    justifyItems: "center",
                    wordBreak: 'break-word',
                }
            }
        },
        MuiListItemText: {
            styleOverrides: {
                root: {
                    padding: 0,
                    margin: 0,
                    width: '100%',
                }
            }
        },
        MuiMenu: {
            styleOverrides: {
                root: {
                    overflow: 'none',
                }
            }
        },
        MuiGrid: {
            styleOverrides: {
                container: {
                    width: '100%',
                    margin: 0,
                    padding: 0,
                },
                item: {
                    padding: 0,
                    margin: 0,
                },

            }
        }
    }
});

export default theme;