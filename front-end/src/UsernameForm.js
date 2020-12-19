import { useContext, useState} from 'react';
/** @jsx jsx */
import { jsx } from '@emotion/core';
import { useTheme } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Context from './Context';
import Grid from '@material-ui/core/Grid';
import {ResponsiveButton} from './ResponsiveButton'; 
import {ReactComponent as FriendsIcon} from './icons/friends.svg';
import {useHistory} from "react-router-dom";
import axios from 'axios';
import Avatar from './Avatar';
import md5 from 'md5';


const useStyles = (theme) => ({
root: {
  backgroundColor:  theme.palette.secondary.dark,
  flex: '1 1 auto',
  display: 'flex',
  height :'100%'
}
})

const Image = ({image, theme}) => {
      const style = ({  
        width : '100px',
        heigh : '100px',
        borderRadius : '50%',
        border : '1px solid',
        borderColor : theme.palette.secondary.light,
        marginBottom : '10px'
    })

    const resolveStateImage = ()=>{
      if(image === 0)
        return <FriendsIcon/>
      else if(image === 1)
        return 
    }

    return (
      <div css={style}>
        {resolveStateImage()}
      </div> 
    )
}

//TODO : verifier la validité de l'username
export default ()=>{
const history = useHistory()
  const theme = useTheme()
  const styles = useStyles(theme)
  const {oauth,setOauth} = useContext(Context)    
  const [username, setUserName] = useState('')
  const [message, setMessage] = useState('please enter the username you want to use (you can change it later)')
  const [image, setImage] = useState(0) 

  const handleChangeUsername = (event) => {
    setUserName(event.target.value)
  }


  const handleNewUser = async () =>{
    if(!username){
      setMessage('please enter a username !!')
    }
    else{
      try{
        const data = {
          name : username
        }
        const user = await axios.post('http://localhost:3001/users', data, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${oauth.access_token}`
          }})
        
        oauth.user = user.data
        setOauth(oauth)
        history.push('/')
      }catch(err){
        setMessage('Oops an error occur try again..')
      }
    }
  }

  const handleGravatar = () =>{
    try{ 
    setImage(1)
    }catch(err){

    }
  }

  const handleEceAvatar = () =>{
    setImage(2)
  }

  const handleComputerAvatar = () => {
    setImage(3)
  }

  const propsButton ={
    size:"large",
    variant:"contained",
    color:"primary",
    onClick: handleNewUser
  } 

  return (
    <div css = {styles.root}>
        <Grid
        container
        direction="column"
        justify = "center"
        alignItems="center"
      >
              {message}
            <TextField
              autoFocus
              required
              variant="outlined" 
              color = "primary"
              id="name"
              label="username"
              margin="normal"
              onChange = {handleChangeUsername}
            />
            <Avatar HandleButton1 ={handleGravatar} HandleButton2={handleEceAvatar} HandleButton3={handleComputerAvatar}/>
            <Image image={image} theme={theme}/>
            <ResponsiveButton name = {'Send'} props = {propsButton}/>
            </Grid>
    </div>
  )
}