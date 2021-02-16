import { createMuiTheme } from '@material-ui/core/styles'

// Create a theme instance.
const theme = createMuiTheme({
  palette: {
    common: { black: '#000', white: '#fff' },
    background: { paper: '#fff', default: '#fafafa' },
    primary: {
      light: '#7986cb',
      main: 'rgba(47, 121, 161, 1)',
      dark: '#303f9f',
      contrastText: '#fff',
    },
    secondary: {
      light: '#ff4081',
      main: 'rgba(195, 8, 11, 1)',
      dark: '#c51162',
      contrastText: '#fff',
    },
    error: {
      light: '#e57373',
      main: 'rgba(255, 17, 0, 1)',
      dark: '#d32f2f',
      contrastText: '#fff',
    },
    text: {
      primary: 'rgba(0, 0, 0, 0.87)',
      secondary: 'rgba(0, 0, 0, 0.54)',
      disabled: 'rgba(0, 0, 0, 0.38)',
      hint: 'rgba(0, 0, 0, 0.38)',
    },
  },
  overrides: {
    MuiContainer: {
      root: {
        padding: '10px 10px 10px 10px',
      },
    },
    // MuiButton: {
    //   root: {
    //     // background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
    //     border: 0,
    //     borderRadius: 3,
    //     boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
    //     // color: 'white',
    //     // height: 20,
    //     padding: '0 10px',
    //   },
    // },
  },
  props: {
    MuiList: {
      dense: true,
    },
    MuiMenuItem: {
      dense: true,
    },
    MuiTable: {
      size: 'small',
    },
    MuiButton: {
      size: 'small',
    },
    MuiButtonGroup: {
      size: 'small',
    },
    MuiCheckbox: {
      size: 'small',
    },
    MuiFab: {
      size: 'small',
    },
    MuiFormControl: {
      margin: 'dense',
      size: 'small',
    },
    MuiFormHelperText: {
      margin: 'dense',
    },
    MuiIconButton: {
      size: 'small',
    },
    MuiInputBase: {
      margin: 'dense',
    },
    MuiInputLabel: {
      margin: 'dense',
    },
    MuiRadio: {
      size: 'small',
    },
    MuiSwitch: {
      size: 'small',
    },
    MuiTextField: {
      margin: 'dense',
      size: 'small',
    },
  },
  shape: {
    borderRadius: 4,
  },
  spacing: 8,
  typography: {
    fontFamily: 'Helvetica',
  },
})

export default theme
