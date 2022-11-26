export const navbarStyles = {
    drawer: {
        width: 320,
        // width: '100vh',
        flexShrink: 0,
        overflow: 'hidden',
        '& .MuiDrawer-paper': {
            // width: '100vh',
            width: 320,
            overflow: 'visible',
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
        flexDirection: 'column',
        width: '316px',
        height: '100%',
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
        padding: 0,
        mr: 2,
        width: '98.5%',
        height: '100px',
        backgroundColor: '#f5f5f5',
        borderBottom: '1px solid rgba(0, 0, 0, 0.12)',
    },
    addUserButton: {
        fontSize: '0.65rem',
        width: '60px'
    },
};