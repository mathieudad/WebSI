/** @jsx jsx */
import { jsx } from '@emotion/core'
const {Duration} = require('luxon')
const { DateTime } = require("luxon")

const styles = {

  messages: {
    color : '#ffffff',
    flex: '1 1 auto',
    height: '100%',
    overflow: 'auto',
    '& ul': {
      'margin': 0,
      'padding': 0,
      'textIndent': 0,
      'listStyleType': 0,
    },
  },message: {
      margin: '.2rem',
      padding: '.2rem',
      //backgroundColor: '#66728E',
      ':hover': {
        backgroundColor: 'rgba(255,255,255,.2)',
      },
  }
}



export default ({channel, messages}) => {
    return(
          <div css={styles.messages}>
            <h1>Messages for {channel.name}</h1>
            <ul>
              { messages.map( (message, i) => {
                //The date will be relative until a year ago
                let date = DateTime.fromMillis(message.creation)
                date = DateTime.local().year - date.year >= 1 ? date.toFormat("dd-MM-yyyy à hh:mm") : date.toRelativeCalendar()
               return <li key={i} css={styles.message}>
                  <p>
                    <span>{message.author}</span>
                    {' '}
                    <span>{date}</span>
                  </p>
                  <div>
                    {
                      message.content
                      .split(/(\n +\n)/)
                      .filter( el => el.trim() )
                      .map( el => <p>{el}</p>)
                    }
                  </div>
                </li>
              })}
            </ul>
          </div>
    )
}