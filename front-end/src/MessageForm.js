/** @jsx jsx */
import { jsx } from '@emotion/core'

const styles = {
  form: {
    borderTop: '2px solid #a8b3b8',
    padding: '.5rem',
    display: 'flex',
  },
  content: {
    flex: '1 1 auto',
    marginRight: '.5rem'
  },send: {
    borderRadius : 10,
    backgroundColor: '#a8b3b8',
    padding: '.2rem .5rem',
    border: 'none',
    ':hover': {
      backgroundColor: '#2A4B99',
      cursor: 'pointer',
      color: '#fff',
    },
  }
}

export default ({addMessage}) => {
    const onSubmit = (e) => {
      e.preventDefault()
      const data = new FormData(e.target)
      addMessage({
        content: data.get('content'),
        author: 'david',
        creation: Date.now(),
      })
      e.target.elements.content.value = ''
    } 
    return (
      <form css={styles.form}  onSubmit={onSubmit}>
        <input type="input" name="content" css={styles.content} />
        <input type="submit" value="Send" css={styles.send} />
      </form>
    )
  }

