
/** @jsx jsx */
import { jsx } from '@emotion/core'
import Grid from '@material-ui/core/Grid'
import { ResponsiveButton } from '../ResponsiveButton'
import { ReactComponent as GravatarIcon } from '../icons/gravatar.svg'
import { ReactComponent as FolderIcon } from '../icons/archive.svg'
import { ReactComponent as AvatarIcon } from '../icons/avatar.svg'


const useStyles = ({
  avatar: {
    width: '80%',
    marginBottom: '30px'
  },
  icon: {
    width: '30%',
    fill: '#fff',
    marginBottom: '10px',
  },
  card: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    textAlign: 'center',
  }
})

export default ({ HandleButton1, HandleButton2, HandleButton3 }) => {
  const styles = useStyles
  const props1 = {
    size: "small",
    variant: "outlined",
    color: "primary",
    onClick: HandleButton1
  }
  const props2 = {
    size: "small",
    variant: "outlined",
    color: "primary",
    onClick: HandleButton2
  }
  const props3 = {
    size: "small",
    variant: "outlined",
    color: "primary",
    onClick: HandleButton3
  }

  return (
    <div css={styles.avatar} >
      <Grid
        container
        direction="row"
        justify="center"
        alignItems="flex-end"
        spacing={1}
        wrap="nowrap">
        <Grid item xs={2}>
          <div css={styles.card} >
            <GravatarIcon css={styles.icon} />
            <ResponsiveButton name='Import From your Gravatar' props={props1} />
          </div>
        </Grid>
        <Grid item xs={2}>
          <div css={styles.card}>
            <AvatarIcon css={styles.icon} />
            <ResponsiveButton name='Choose one of our Avatars' props={props2} />
          </div>
        </Grid>
        <Grid item xs={2}>
          <div css={styles.card}>
            <FolderIcon css={styles.icon} />
            <ResponsiveButton name='Import From Your Computer' props={props3} />
          </div>
        </Grid>
      </Grid>
    </div>
  )
}
