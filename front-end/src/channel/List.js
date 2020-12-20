import React from 'react'
import { forwardRef, useImperativeHandle, useLayoutEffect, useRef, useState } from 'react'
/** @jsx jsx */
import { jsx } from '@emotion/core'
import unified from 'unified'
import markdown from 'remark-parse'
import remark2rehype from 'remark-rehype'
import html from 'rehype-stringify'
import dayjs from 'dayjs'
import calendar from 'dayjs/plugin/calendar'
import updateLocale from 'dayjs/plugin/updateLocale'
import CreateIcon from '@material-ui/icons/Create'
import DeleteForeverIcon from '@material-ui/icons/DeleteForever'
import CheckIcon from '@material-ui/icons/Check';
import { FormControl, IconButton, InputLabel, OutlinedInput } from '@material-ui/core'
import ClearIcon from '@material-ui/icons/Clear';


dayjs.extend(calendar)
dayjs.extend(updateLocale)
dayjs.updateLocale('en', {
  calendar: {
    sameElse: 'DD/MM/YYYY hh:mm A'
  }
})



function timeConverter(microtime){
  var time = new Date(microtime /1000)
  var date = time.toDateString() + ' '+  time.toLocaleTimeString() 
  return date;
}

const useStyles = {
  root: {
    position: 'relative',
    flex: '1 1 auto',
    'pre': {

      overflowY: 'auto',
    },
    '& ul': {
      'margin': 0,
      'padding': 0,
      'textIndent': 0,
      'listStyleType': 0,
    },
  },
  message: {
    padding: '.2rem .5rem',
    ':hover': {
      backgroundColor: 'rgba(255,255,255,.05)',
    },
  },
  fabWrapper: {
    position: 'absolute',
    right: 0,
    top: 0,
    width: '50px',
  },
  fab: {
    position: 'fixed !important',
    top: 0,
    width: '50px',
  },
}

export default forwardRef(({
  channel,
  messages,
  onScrollDown,
  onModification,
  onSendModification,
  onDeletion,
  currentEditingMessage,
  cancelCurrentModification
}, ref) => {
  const styles = useStyles

  // Expose the `scroll` action
  useImperativeHandle(ref, () => ({
    scroll: scroll
  }));

  const rootEl = useRef(null)
  const scrollEl = useRef(null)

  const scroll = () => {
    scrollEl.current.scrollIntoView()
  }

  // See https://dev.to/n8tb1t/tracking-scroll-position-with-react-hooks-3bbj
  const throttleTimeout = useRef(null) // react-hooks/exhaustive-deps

  useLayoutEffect(() => {
    const rootNode = rootEl.current // react-hooks/exhaustive-deps
    const handleScroll = () => {
      if (throttleTimeout.current === null) {
        throttleTimeout.current = setTimeout(() => {
          throttleTimeout.current = null
          const { scrollTop, offsetHeight, scrollHeight } = rootNode // react-hooks/exhaustive-deps
          onScrollDown(scrollTop + offsetHeight < scrollHeight)
        }, 200)
      }
    }
    handleScroll()
    rootNode.addEventListener('scroll', handleScroll)
    return () => rootNode.removeEventListener('scroll', handleScroll)
  })

  const [editingMessageContent, setEditingMessageContent] = useState()

  const handleMessageModification = (event) => {
    setEditingMessageContent(event.target.value)
  }

  const handleSendMessageModification = (event) => {
    setEditingMessageContent(null)
    onSendModification(event.currentTarget.value)
    event.stopPropagation()
  }

  return (
    <div css={styles.root} ref={rootEl}>
      <h1>Messages for {channel.name}</h1>
      <ul>
        {messages.map((message, i) => {
          const { contents: content } = unified()
            .use(markdown)
            .use(remark2rehype)
            .use(html)
            .processSync(message.content)
          const isEditing = currentEditingMessage && currentEditingMessage.creation === message.creation
          return (
            <li key={message.creation} css={styles.message}>
              <p>
                <span>{message.author}</span>
                {' - '}
                {console.log(message.creation)}
                <span>{timeConverter(parseInt(message.creation))}</span>
                <IconButton size='small' color='secondary' onClick={onDeletion} value={message.creation}>
                  <DeleteForeverIcon />
                </IconButton>
                {
                  isEditing
                    ? <React.Fragment><IconButton size='small' color='secondary' onClick={handleSendMessageModification} value={editingMessageContent}>
                      <CheckIcon />
                    </IconButton>
                      <IconButton size='small' color='secondary' onClick={cancelCurrentModification} value={editingMessageContent}>
                        <ClearIcon />
                      </IconButton></React.Fragment>
                    : <IconButton size='small' color='secondary' onClick={onModification} value={JSON.stringify(message)}>
                      <CreateIcon />
                    </IconButton>
                }
              </p>
              {
                isEditing
                  ? <FormControl variant="outlined">
                    <InputLabel htmlFor="component-outlined">Editing</InputLabel>
                    <OutlinedInput id="component-outlined" value={typeof editingMessageContent == 'string' ? editingMessageContent : message.content} onChange={handleMessageModification} label="Name" />
                  </FormControl>
                  : <div dangerouslySetInnerHTML={{ __html: content }}></div>
              }
            </li>
          )
        })}
      </ul>
      <div ref={scrollEl} />
    </div>
  )
})
