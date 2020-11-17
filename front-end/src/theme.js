import { createMuiTheme } from '@material-ui/core/styles'

const theme = createMuiTheme({
  palette: {
    primary :{
    main: "#2196f3"
    },
    secondary :{
    main: '#1976d2'
    },
    background : {
      default : '#e8eaf6'
    }
    },
    status : {
        danger : 'orange',
    }
})

export default theme