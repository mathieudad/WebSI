import './App.css'
/** @jsx jsx */
import { jsx } from '@emotion/core'

import Header from './Header'
import Main from './Main'
import Footer from './Footer'

const styles = {
  root: {
    color : '#00aeeb',
    boxSizing: 'border-box',
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: '#ffffff',
    padding: '50px'
  },
  headerLogIn: {
    backgroundColor: 'red',
  },
  headerLogOut: {
    backgroundColor: 'blue',
  }
}

export default ({
  channel = {
    name: 'Fake channel'
  }
}) => {
  return (
    <div className="App" css={styles.root}>
      <Header/>
      <Main channel={channel}/>
      <Footer/>
    </div>
  );
}
