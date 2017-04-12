import getMuiTheme from 'material-ui/styles/getMuiTheme';
import {
    lightBlue700,
    lightBlue500,
    lightBlue100,
    white,
    redA200,
    grey900,
    grey600,
    grey400
} from 'material-ui/styles/colors';

const defaultMuiTheme = getMuiTheme({
    palette: {
        primary1Color: lightBlue500,
        primary2Color: lightBlue700,
        primary3Color: lightBlue100,
        accent1Color: redA200,
        accent2Color: grey400,
        accent3Color: grey600,
        textColor: grey900,
        alternateTextColor: white
    }
});

export default defaultMuiTheme;
