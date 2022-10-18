export const navbarStyles = {
    drawer: {
        width: 320,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
            width: 320,
            boxSizing: 'border-box',
            // backgroundColor: '#101F33',
            // color: 'rgba(255, 255, 255, 0.7)',
        },
    },

    avatar: {
        justifyContent: 'center',
        '& .MuiGrid-item': {
            display: 'flex',
            justifyContent: 'center',
            width: '100%'
        },
        '& .MuiAvatar-root': {
            width: '50px',
            justifyContent: 'left',
            height: '50px'
        }
    },

    tabs: {
        display: 'flex',
        justifyContent: 'center',
        margin: 0,
        padding: 0,

        '& .MuiList-root': {
            display: 'flex',
            flexDirection: 'row',
            margin: 0,
            padding: 0,
            '& .MuiListItem-root': {

                margin: 0.5,
                padding: 0,
                height: '60px',
                '& .MuiButtonBase-root': {
                    height: '100%',
                    width: '157px',
                }
            }
        },

    },

    icons: {
        marginLeft: '10px',
    },

    text: {
        '& span': {
            marginLeft: '-10px',
            fontWeight: '600',
            fontSize: '20px',
        }
    },

    contacts: {
        width: '100%',
        height: '100%',
        '&  .css-4ogtsq-MuiGrid-root': {
            margin: 0,
            padding: 0,
            width: '100%',
            // height: '100px'
        }
    },

    wrapper: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingRight: '10px',
        height: '100px',
        backgroundColor: '#f5f5f5',
        borderBottom: '1px solid rgba(0, 0, 0, 0.12)',
    },
    addUserButton: {
        fontSize: '0.65rem',
        width: '50px'
    },
};