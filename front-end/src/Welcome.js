import {useState} from 'react';
/** @jsx jsx */
import { jsx } from '@emotion/core'
// Layout
import { useTheme } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import {ReactComponent as ChannelIcon} from './icons/channel.svg';
import {ReactComponent as FriendsIcon} from './icons/friends.svg';
import {ReactComponent as SettingsIcon} from './icons/settings.svg';
import AddIcon from '@material-ui/icons/Add';
import CreateChannel from './CreateChannel';
import {ResponsiveButton} from './ResponsiveButton';

const useStyles = (theme) => ({
  root: {
    height: '100%',
    flex: '1 1 auto',
    display: 'flex',
    // background: 'rgba(0,0,0,.2)',
  },
  card: {
    display : 'flex',
    flexDirection : 'column',
    alignItems : 'center',
    textAlign: 'center',
  },
  icon: {
    width: '30%',
    fill: '#fff',
    marginBottom : '10px',
  }
})



export default () => {
  const styles = useStyles(useTheme())
  const [open, setOpen] = useState(false)

  const handleClickOpen = () => {
    setOpen(true);
  }
  
  const handleClose = () => {
    setOpen(false);
  }

  const propsChannel = {
    variant:"contained",
    color:"primary",
    onClick: handleClickOpen
}

  return (
    <div css={styles.root}>
      <Grid container
        direction="row"
        justify="center"
        alignItems="center"
        spacing={5} >
        <Grid item xs>
          <div css={styles.card}>
            <ChannelIcon css={styles.icon} />
       <ResponsiveButton name = {'Create a Channel'} props = {propsChannel} icon={<AddIcon/>}/>
      <CreateChannel open={open} onClose= {handleClose} aria-labelledby="form-dialog-title"/>
          </div>
        </Grid>
        <Grid item xs>
          <div css={styles.card}>
            <FriendsIcon css={styles.icon} />
            <Typography color="textPrimary">
              Invite friends
            </Typography>
          </div>
        </Grid>
        <Grid item xs>
          <div css={styles.card}>
            <SettingsIcon css={styles.icon} />
            <Typography color="textPrimary">
              Settings
            </Typography>
          </div>
        </Grid>
      </Grid>
    </div>
  );
}
