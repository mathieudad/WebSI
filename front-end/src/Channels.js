import { useContext, useEffect, useState } from 'react';
import { useTheme } from '@material-ui/core/styles';
import axios from 'axios';
/** @jsx jsx */
import { jsx } from '@emotion/core'
// Layout
import Link from '@material-ui/core/Link'
// Local
import Context from './Context'
import { useHistory } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import { Typography } from '@material-ui/core';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import IconButton from '@material-ui/core/IconButton';
import HandleChannel from './HandleChannel';


const useStyles = (theme) => ({
  root: {
    backgroundColor: theme.palette.secondary.light,
    minWidth: '200px',
  },
  channel: {
    padding: '.2rem .5rem',
    whiteSpace: 'nowrap',
  }
})

export default () => {
  const styles = useStyles(useTheme())
  const {
    oauth,
    channels, setChannels
  } = useContext(Context)
  const history = useHistory()
  const [openModification, setOpenModification] = useState(false)
  const  [currentChannel, setCurrentChannel] = useState()

  useEffect(() => {
    const fetch = async () => {
      try {
        const { data: channels } = await axios.get('http://localhost:3001/channels', {
          headers: {
            'Authorization': `Bearer ${oauth.access_token}`
          }
        })
        setChannels(channels)
      } catch (err) {
        console.error(err)
      }
    }
    fetch()
  }, [oauth, setChannels])

  const handleCloseModification = () => {
    setOpenModification(false)
  }

  const handleOpenModification = (e) => {
    setCurrentChannel(channels.find(channel => channel.id === e.currentTarget.value))
    setOpenModification(true)
  }



  return (
    <ul css={styles.root}>
      { channels.map((channel, i) => (
        <li key={i} css={styles.channel}>
          <Grid container
            justify="space-between"
            alignItems="center">
            <Link
              href={`/channels/${channel.id}`}
              onClick={(e) => {
                e.preventDefault()
                history.push(`/channels/${channel.id}`)
              }} >
              <Typography color="primary" variant="h6">
                {channel.name}
              </Typography>
            </Link>
            <IconButton
              size="small"
              variant="contained"
              color="primary"
              onClick={handleOpenModification}
              value={channel.id}> <MoreHorizIcon /> </IconButton>
          </Grid>
          <HandleChannel open={openModification} onClose={handleCloseModification} channel={currentChannel} />
        </li>
      ))}
    </ul>
  );
}
