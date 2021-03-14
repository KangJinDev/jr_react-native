import createMuiTheme from '@material-ui/core/styles/createMuiTheme';

const theme = createMuiTheme({
    breakpoints: {
        keys: [
            'xs',
            'sm',
            'md',
            'lg',
            'xl',
        ],
        values: {
            xs: 0,
            sm: 500,
            md: 800,
            lg: 1280,
            xl: 1920,
        },
    },
    direction: 'ltr',
    overrides: {},
    palette: {
        base: {
            white: '#FFFFFF',
            100: '#EEEEEE',
            200: '#DEE2E5',
            300: '#ADB0B8',
            400: '#95989A',
            500: '#60636B',
            600: '#6A7081',
            700: '#2B2F3A',
            800: '#1B1B28',
        },
        primary: {
            yellow: '#FDBA45',
            main: '#FF6F00',
            red: '#F34734',
        },
        secondary: {
            main: '#5985EE',
            lightPink: '#FBC1BA',
            lightBrown: '#FFB787',
            lightYellow: '#FFDA98',
            brown: '#FF6F00',
            darkYellow: '#E99708',
        },
        background: {
            default: '#EEEEEE',
            paper: '#FFFFFF',
            symbol: '#16BBCF',
            splash: '#ff5c1a',
        },
        shadow: {
            main: '0 3px 5px rgba(0, 0, 0, 0.15)',
            light: '3px 3px 5px rgba(0, 0, 0, 0.05)',
        },
    },
    typography: {
        h1: {
            fontSize: 40,
            fontWeight: 500,
            lineHeight: '53px',
            letterSpacing: 0,
        },
        h2: {
            fontSize: 26,
            fontWeight: 400,
            lineHeight: '35px',
            letterSpacing: 0,
        },
        h3: {
            fontSize: 22,
            fontWeight: 400,
            lineHeight: '30px',
            letterSpacing: 0,
        },
        h4: {
            fontSize: 18,
            fontWeight: 500,
            lineHeight: '24px',
            letterSpacing: 0.5,
        },
        h5: {
            fontSize: 18,
            fontWeight: 400,
            lineHeight: '24px',
            letterSpacing: 0,
        },
        h6: {
            fontSize: 16,
            fontWeight: 400,
            lineHeight: '21px',
            letterSpacing: 0,
        },
        body1: {
            fontSize: 18,
            fontWeight: 400,
            lineHeight: '24px',
            letterSpacing: 0.06,
        },
        subtitle1: {
            fontSize: 13,
            fontWeight: 400,
            lineHeight: '17px',
            letterSpacing: 0,
        },
        subtitle2: {
            fontSize: 14,
            fontWeight: 500,
            lineHeight: '19px',
            letterSpacing: 0,
        },
        caption: {
            fontSize: 12,
            fontWeight: 400,
            lineHeight: '16px',
            fontStyle: 'italic',
            letterSpacing: 0,
        },
        overline: {
            fontSize: 12,
            fontWeight: 400,
            lineHeight: '16px',
            letterSpacing: 0.5,
        },
    },
    shape: {
        borderRadius: 4,
    },
    dimensions: {
        headerHeight: 64,
        containerHeight: 'calc(100% - 64px)',
        sidebarWidth: 200,
        sidebarContentWidth: 'calc(100% - 200px)',
    },
    zIndex: {
        appBar: 1100,
        modal: 1300,
        touchPad: 2000,
    },
    nprogress: {
        color: '#000',
    },
});

export default theme;
