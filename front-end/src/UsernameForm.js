  import { useContext, useState} from 'react';
  /** @jsx jsx */
  import { jsx } from '@emotion/core';
  import { useTheme } from '@material-ui/core/styles';
  import TextField from '@material-ui/core/TextField';
  import Context from './Context';
  import Grid from '@material-ui/core/Grid';
  import {ResponsiveButton} from './ResponsiveButton'; 
import {useHistory} from "react-router-dom";
import axios from 'axios';


  const useStyles = (theme) => ({
    root: {
      backgroundColor:  theme.palette.secondary.dark,
      overflow: 'hidden',
      flex: '1 1 auto',
      display: 'flex',
    }
  })

  //TODO : verifier la validité de l'username
  export default ()=>{
    const history = useHistory()
      const styles = useStyles(useTheme())
      const {oauth,setOauth} = useContext(Context)    
      const [username, setUserName] = useState('')
      const [message, setMessage] = useState('please enter the username you want to use (you can change it later)')
    
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
      const propsButton ={
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
            alignItems="center">
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
                <ResponsiveButton name = {'Send Username'} props = {propsButton}/>
                </Grid>
        </div>
      )
    }