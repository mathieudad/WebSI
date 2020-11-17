import './App.css';
/** @jsx jsx */
import { jsx } from '@emotion/core'

import theme from "./theme"
import {Typography} from '@material-ui/core'

const styles = {
  header: {
    height: '60px',
    backgroundColor: theme.palette.primary.main,
    flexShrink: 0,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  headerLogIn: {
    backgroundColor: 'red',
  },
  headerLogOut: {
    backgroundColor: 'blue',
  },
}

export default () => {
  return (
    <header css={styles.header}>
      <Typography color="background" component="h3" variant="h5">
          
      </Typography>
    </header>
  );
}
