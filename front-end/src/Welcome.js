import {useState} from 'react';
/** @jsx jsx */
import { jsx } from '@emotion/core'
// Layout
import { useTheme } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import {ReactComponent as ChannelIcon} from './icons/channel.svg';
import {ReactComponent as SettingsIcon} from './icons/settings.svg';
import AddIcon from '@material-ui/icons/Add';
import HandleChannel from './HandleChannel';
import {ResponsiveButton} from './ResponsiveButton';
import {
  useHistory
} from "react-router-dom";

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
  const [openNewChannel, setOpenNewChannel] = useState(false)
  const history = useHistory()

  const handleOpenNewChannel = () => {
    setOpenNewChannel(true);
  }

  const handleCloseNewChannel = () => {
    setOpenNewChannel(false);
  }

  const handleOpenSettings = () => {
    history.push('/settings')
  }
  

  const propsChannelButton = {
    variant:"contained",
    color:"primary",
    onClick: handleOpenNewChannel
}

const propsSettingsButton = {
  variant:"contained",
  color:"primary",
  onClick: handleOpenSettings
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
       <ResponsiveButton name= {'Create a Channel'} props = {propsChannelButton} icon={<AddIcon/>}/>
      <HandleChannel open={openNewChannel} onClose= {handleCloseNewChannel} aria-labelledby="form-dialog-title"/>
          </div>
        </Grid>
        <Grid item xs>
          <div css={styles.card}>
            <SettingsIcon css={styles.icon} />
            <ResponsiveButton name= {'Open Settings'} props = {propsSettingsButton} />
          </div>
        </Grid>
      </Grid>
    </div>
  );
}
