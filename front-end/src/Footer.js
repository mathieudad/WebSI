import './App.css';
import theme from "./theme"
/** @jsx jsx */
import { jsx } from '@emotion/core'
import {Typography} from '@material-ui/core';

const styles = {
  footer: {
    height: '30px',
    backgroundColor: theme.palette.primary.main,
    flexShrink: 0,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
}

export default () => {
  return (
    <footer style={styles.footer}>
      <Typography color="background" component="h5" variant="h6">
      ©Copyright All rigth reserved
      </Typography>
    </footer>
  );
}
