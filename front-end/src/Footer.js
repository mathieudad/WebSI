/** @jsx jsx */
import { jsx } from '@emotion/core'
import { Grid, Typography } from '@material-ui/core';
import CopyrightIcon from '@material-ui/icons/Copyright';

const useStyles = {
  footer: {
    height: '30px',
    backgroundColor: '#424242',
    flexShrink: 0,
  }
}

export default () => {
  const styles = useStyles

  return (
    <footer style={styles.footer}>
      <Grid
        container
        direction="row"
        justify="center"
        alignItems="flex-end">
        <CopyrightIcon />
        <Typography variant="subtitle2">all right reserved : Mathieu de Campou - Mathieu Dadoun
          </Typography>
      </Grid>
    </footer>
  )
}
