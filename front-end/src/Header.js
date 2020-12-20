
import { useContext } from 'react'
/** @jsx jsx */
import { jsx } from '@emotion/core'
// Layout
import { useTheme } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Context from './Context';
import useSWR from "swr";
import axios from "axios";
import MeetingRoomIcon from '@material-ui/icons/MeetingRoom';
import { ResponsiveButton, ResponsiveIconButton } from './ResponsiveButton';
import { Grid, Typography } from '@material-ui/core';
import ForumIcon from '@material-ui/icons/Forum';
import { useHistory } from "react-router-dom";
import SettingsIcon from '@material-ui/icons/Settings';



const useStyles = (theme) => ({
  header: {
    padding: theme.spacing(1),
    backgroundColor: theme.palette.primary.dark,
  },
  headerLogIn: {
    backgroundColor: 'red',
  },
  headerLogOut: {
    backgroundColor: 'blue',
  },
  menu: {
    [theme.breakpoints.up('sm')]: {
      display: 'none !important',
    }
  }
})



export default () => {
  const styles = useStyles(useTheme())
  const history = useHistory()
  let avatar = null
  const {
    oauth, setOauth,
    drawerVisible, setDrawerVisible
  } = useContext(Context)
  if (oauth && oauth.user) {
    const email64 = window.btoa(oauth.email)
    const url = `http://localhost:3001/users/${email64}`;

    const fetcher = (...args) => axios.get(...args, {
      headers: {
        'Authorization': `Bearer ${oauth.access_token}`
      }
    }).then((res) => res.data);
    const { data, error } = useSWR(url, fetcher);
    avatar = !error && !data ? (<div>{oauth.user.name} loading..</div>)
      : (data ? (<div>
        <Grid
          container
          direction="row"
          justify="flex-start"
          alignItems="center">
            <img alt="avatar" src={data.avatar} heigh="40%" width="40%" />
          
            <Typography color="textPrimary" variant="h5">
              {oauth.user.name}
            </Typography>
        </Grid>
      </div>) : null)
  }

  const drawerToggle = (e) => {
    setDrawerVisible(!drawerVisible)
  }
  const onClickLogout = (e) => {
    e.stopPropagation()
    setOauth(null)
  }

  const handleMenu = () => {
    history.push('./')
  }

  const handleSettings = () => {
    history.push('./settings')
  }

  const buttonLogoutProps = {
    variant: "contained",
    color: "secondary",
    onClick: onClickLogout
  }



  const buttonSettingsProps ={
    variant: "contained",
    color: "secondary",
    onClick: handleSettings
  }

  const buttonHomeProps ={
    color: "secondary",
    onClick: handleMenu
  }



  return (
    <header css={styles.header}>
      <IconButton
        color="inherit"
        aria-label="open drawer"
        onClick={drawerToggle}
        css={styles.menu}
      >
        <MenuIcon />
      </IconButton>
      {
        oauth && oauth.user ?
          (<div>
            <Grid
              container
              direction="row"
              justify="space-between"
              alignItems="center">
              {avatar}
              <ResponsiveButton name="Ece Chat" props={buttonHomeProps} icon={<ForumIcon/>}/>
              
              <div> 
              <ResponsiveIconButton props={buttonSettingsProps} icon={<SettingsIcon/>}/>
              <ResponsiveButton name="logout" props={buttonLogoutProps} icon={<MeetingRoomIcon />} />
              </div>
            </Grid>
          </div>)
          : (<Typography color="textPrimary" variant="h5">Hello</Typography>)
      }
    </header>
  );
}
