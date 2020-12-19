
import { useContext } from 'react'
/** @jsx jsx */
import { jsx } from '@emotion/core'
// Layout
import { useTheme } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import Link from '@material-ui/core/Link';
import MenuIcon from '@material-ui/icons/Menu';
import Context from './Context';
import useSWR from "swr";
import axios from "axios";

const useStyles = (theme) => ({
  header: {
    padding: theme.spacing(1),
    backgroundColor: theme.palette.secondary.light,
    flexShrink: 0,
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
  let avatar= null
  const {
    oauth, setOauth,
    drawerVisible, setDrawerVisible
  } = useContext(Context)
    if(oauth){
    const email64 = window.btoa(oauth.email)
    const url = `http://localhost:3001/users/${email64}`;
    
    const fetcher = (...args) => axios.get(...args,{
      headers: {
      'Authorization': `Bearer ${oauth.access_token}`
    }}).then((res) => res.data);
    const { data, error } = useSWR(url, fetcher);
    avatar =  !error && !data ? (<div>loading..</div>)
      : (data ? (<img alt="avatar" src={data.avatar}/>): null)
  }

  const drawerToggle = (e) => {
    setDrawerVisible(!drawerVisible)
  }
  const onClickLogout = (e) => {
    e.stopPropagation()
    setOauth(null)
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
      Header
      {
      oauth && oauth.user ? 
          (<span>
            {oauth.email}
            <Link onClick={onClickLogout}>logout</Link>
            {avatar}
          </span>)
        : (<span>new user</span>)
      }
      
    </header>
  );
}
