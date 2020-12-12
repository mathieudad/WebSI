
/** @jsx jsx */
import { jsx } from '@emotion/core'
import {useTheme} from '@material-ui/core/styles';

const useStyles = theme => ({
  footer: {
    height: '30px',
    backgroundColor: theme.palette.secondary.light,
    flexShrink: 0,
  },
})

export default () => {
  const styles = useStyles(useTheme())
  return (
    <footer style={styles.footer}>
      footer
    </footer>
  );
}
