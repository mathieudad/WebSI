import {useContext, useRef, useState, useEffect} from 'react';
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
import { useParams } from 'react-router-dom'

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
  const styles = useStyles(useTheme())
  const listRef = useRef()
  const channelId = useRef()
  const [messages, setMessages] = useState([])
  const [currentEditingMessage, setCurrentEditingMessage] = useState(null)
  const [scrollDown, setScrollDown] = useState(false)
  const addMessage = () => {
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
  const { data } = useSWR(url, fetcher);

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

  useEffect (() => {
    setChannel(channels.find( channel => channel.id === id))
  }, [id, channels])
  
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

  const handleMessageDeletion = (event) => {
    setMessages(messages.filter(message => message.creation !== event.currentTarget.value))
    axios.delete(`http://localhost:3001/channels/${channel.id}/messages/${event.currentTarget.value}`, {
      headers: {
        'Authorization': `Bearer ${oauth.access_token}`
      }
    })
    console.log(event.currentTarget.value)
    event.stopPropagation()
  }

  const handleMessageModification = async (event) => {
    console.log(event.currentTarget.value)
    setCurrentEditingMessage(JSON.parse(event.currentTarget.value))
    event.stopPropagation()
  }

  const handleSendMessageModification = async (content) => {
    const newMessage = currentEditingMessage
    setCurrentEditingMessage(null)
    if(!content) return 
    newMessage.content = content
    const index = messages.findIndex(message => message.creation === newMessage.creation)
    messages[index].content = content
    setMessages(messages)
    axios.put(`http://localhost:3001/channels/${channel.id}/messages/${newMessage.creation}`,newMessage, {
      headers: {
        'Authorization': `Bearer ${oauth.access_token}`
      }
    })
  }

  const handleCancelCurrentModification =() => {
    setCurrentEditingMessage(null)
  }

  const loading = <div>Loading...</div>
  const content = (
    <div css={styles.root}>
      <List
        channel={channel}
        messages={messages}
        onScrollDown={onScrollDown}
        onDeletion={handleMessageDeletion}
        onModification={handleMessageModification}
        onSendModification={handleSendMessageModification}
        currentEditingMessage={currentEditingMessage}
        cancelCurrentModification = {handleCancelCurrentModification} 
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
