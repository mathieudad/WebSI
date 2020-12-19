
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
import { ResponsiveButton } from './ResponsiveButton';
import { Grid, Typography } from '@material-ui/core';


const useStyles = (theme) => ({
  header: {
    padding: theme.spacing(1),
    backgroundColor: theme.palette.secondary.dark,
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
    },
  }
})



export default () => {
  const styles = useStyles(useTheme())
  let avatar = null
  const {
    oauth, setOauth,
    drawerVisible, setDrawerVisible
  } = useContext(Context)
  if (oauth) {
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
          <Grid item>
            <img alt="avatar" src={data.avatar} heigh="50%" width="50%" />
          </Grid>
          <Grid item>
            <Typography color="textPrimary" variant="h5">
              {oauth.user.name}
            </Typography>
          </Grid>
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


  const buttonProps = {
    size: "medium",
    variant: "contained",
    color: "primary",
    onClick: onClickLogout
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
              <ResponsiveButton name="logout" props={buttonProps} icon={<MeetingRoomIcon />} />

            </Grid>
          </div>)
          : (<Typography color="textPrimary" variant="h5">Hello</Typography>)
      }
    </header>
  );
}
