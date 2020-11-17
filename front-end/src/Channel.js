import {useRef, useState} from 'react';
import axios from 'axios';
/** @jsx jsx */
import { jsx } from '@emotion/core'
// Layout
import Fab from '@material-ui/core/Fab';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
// Local
import Form from './channel/Form'
import List from './channel/List'
import theme from './theme'

const useStyles = (theme) => ({
  root: {
    height: '100%',
    flex: '1 1 auto',
    display: 'flex',
    flexDirection: 'column',
    background: theme.palette.background.default,
    position: 'relative'
  },
  fab: {
    position: 'absolute !important',
    top: theme.spacing(2),
    // width: '50px',
    // bottom: '0',
    // marginLeft: '100%',
    // bottom: theme.spacing(2),
    right: theme.spacing(2),
  },
  fabDisabled: {
    display: 'none !important',
  },
  icon: {
    width: '30%',
    fill: '#fff',
  }
})

export default ({channel}) => {
  const styles = useStyles(theme)
  const listRef = useRef({
    id: 0,
    username: 'user_1'
  });
  const channelId = useRef(1)
  const [messages, setMessages] = useState([{autor: "Mathieu", creation:123456789, content: "Hello world !"}])
  const [scrollDown, setScrollDown] = useState(false)
  const addMessage = (message) => {
    fetchMessages()
  }
  const fetchMessages = async () => {
    setMessages([])
    const {data: messages} = await axios.get(`http://localhost:3001/channels/${channel.id}/messages`)
    setMessages(messages)
    if(listRef.current){
      //listRef.current.scroll()
    }
  }
  
  if(channelId.current !== channel.id){
    fetchMessages()
    channelId.current = channel.id
  }
  const onScrollDown = (scrollDown) => {
    setScrollDown(scrollDown)
  }
  const onClickScroll = () => {
    listRef.current.scroll()
  }
  return (
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
      <ArrowDownwardIcon css={styles.icon} />
      </Fab>
    </div>
  );
}
