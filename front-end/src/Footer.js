
/** @jsx jsx */
import { jsx } from '@emotion/core'
import { Grid, Typography } from '@material-ui/core';
import {useTheme} from '@material-ui/core/styles';
import CopyrightIcon from '@material-ui/icons/Copyright';

const useStyles = theme => ({
  footer: {
    height: '30px',
    backgroundColor: theme.palette.secondary.dark,
    flexShrink: 0,
  },
})

export default () => {
  const styles = useStyles(useTheme())
  return (
    <footer style={styles.footer}>
      <Grid 
        container
        direction="row"
        justify="center"
        alignItems="flex-end">
          <CopyrightIcon/> 
          <Typography variant="subtitle2">all right reserved : Mathieu de Campou - Mathieu Dadoun
          </Typography>
        </Grid>
    </footer>
  );
}
