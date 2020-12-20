import {useContext, useRef, useState} from 'react';
import axios from 'axios';
import useSWR from "swr";
/** @jsx jsx */
import { jsx } from '@emotion/core'
// Layout
import { useTheme } from '@material-ui/core/styles';
import Fab from '@material-ui/core/Fab';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
// Local
import Form from './channel/Form'
import List from './channel/List'
import Context from './Context'
import { useHistory, useParams } from 'react-router-dom'

const useStyles = (theme) => ({
  root: {
    height: '100%',
    flex: '1 1 auto',
    display: 'flex',
    flexDirection: 'column',
    position: 'relative',
    overflowX: 'auto',
    backgroundColor : theme.palette.secondary.dark,
  },
  fab: {
    position: 'absolute !important',
    top: theme.spacing(2),
    right: theme.spacing(2),
  },
  fabDisabled: {
    display: 'none !important',
  }
})

export default () => {
  const history = useHistory()
  const styles = useStyles(useTheme())
  const listRef = useRef()
  const channelId = useRef()
  const [messages, setMessages] = useState([])
  const [scrollDown, setScrollDown] = useState(false)
  const addMessage = (message) => {
    fetchMessages()
  }
  const { id } = useParams()
  const {channels, setChannels, oauth} = useContext(Context)
  const [channel, setChannel] = useState(channels.find( channel => channel.id === id))
  const url = `http://localhost:3001/channels`;
  const fetcher = (...args) => axios.get(...args, {
    headers: {
      'Authorization': `Bearer ${oauth.access_token}`
    }
  }).then((res) => {
    setChannels(res.data)
    setChannel(res.data.find( channel => channel.id === id))
    return  res.data
  });
  const { data, error } = useSWR(url, fetcher);
  const fetchMessages = async () => {
    setMessages([])
    const {data: messages} = await axios.get(`http://localhost:3001/channels/${channel.id}/messages`, {
      headers: {
        'Authorization': `Bearer ${oauth.access_token}`
      }
    })
    setMessages(messages)
    if(listRef.current){
      listRef.current.scroll()
    }
  }
  if(channel && channelId.current !== channel.id){
    fetchMessages()
    channelId.current = channel.id
  }
  const onScrollDown = (scrollDown) => {
    setScrollDown(scrollDown)
  }
  const onClickScroll = () => {
    listRef.current.scroll()
  }
  const loading = <div>Loading...</div>
  const content = (
    <div css={styles.root}>
      <List
        channel={channel}
        messages={messages}
        onScrollDown={onScrollDown}
        ref={listRef}
      />
      <Form addMessage={addMessage} channel={channel} />
      <Fab
        color="primary"
        aria-label="Latest messages"
        css={[styles.fab, scrollDown || styles.fabDisabled]}
        onClick={onClickScroll}
      >
        <ArrowDropDownIcon />
      </Fab>
    </div>
  )
  return data && channel ? content : loading
}
