import React from 'react';
import {useState} from 'react'
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import { makeStyles, useTheme } from '@material-ui/core/styles';

//Local
import Channels from './Channels'
import Channel from './Channel'

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: '#373B44',
    overflow: 'hidden',
    display: 'flex',
    flexDirection: 'row',
    flex: '1 1 auto'
  },
  drawer: {
    [theme.breakpoints.up('sm')]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  menuButton: {
    marginRight: theme.spacing(2),
    position: 'fixed',
    zIndex: '2000',
    background: 'red',
    [theme.breakpoints.up('sm')]: {
      width: `calc(100% - ${drawerWidth}px)`,
      display: 'none',
    },
  },
  drawerPaperFixed: {
    width: drawerWidth,
    position: "fixed",
    height: "100%"
  },
  drawerPaperRelative: {
    width: drawerWidth,
    position: "relative",
    height: "100%"
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
}));

export default () => {
  const [channel, setChannel] = useState({name: "Channel 1"})
  const fetchChannel = async (channel) => {
    setChannel(channel)
  }
  const classes = useStyles()
  const theme = useTheme()
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <main className={classes.root}>
      <IconButton
        color="inherit"
        aria-label="open drawer"
        edge="start"
        onClick={handleDrawerToggle}
        className={classes.menuButton}
      >
        <MenuIcon />
      </IconButton>
      <nav className={classes.drawer} aria-label="mailbox folders">
        <Hidden smUp implementation="css">
          <Drawer
            variant="persistent"
            anchor={theme.direction === 'rtl' ? 'right' : 'left'}
            open={mobileOpen}
            onClose={handleDrawerToggle}
            classes={{
              paper: classes.drawerPaperFixed,
            }}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
          >
          <Channels onChannel={fetchChannel} />
          </Drawer>
        </Hidden>
        <Hidden xsDown implementation="css">
          <Drawer
            classes={{
              paper: classes.drawerPaperRelative,
            }}
            variant="permanent"
            open
          >
          <Channels onChannel={fetchChannel} />
          </Drawer>
        </Hidden>
      </nav>
      <Channel channel={channel} messages={[]}/>
    </main>
  );
}
