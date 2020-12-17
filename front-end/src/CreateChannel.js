import React from 'react';
import {useState, useContext} from 'react';
import Context from './Context'
import axios from 'axios';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import AccountCircle from '@material-ui/icons/AccountCircle';
import InputAdornment from '@material-ui/core/InputAdornment';
import {ResponsiveIconButton} from './ResponsiveButton'
import SentimentVeryDissatisfiedIcon from '@material-ui/icons/SentimentVeryDissatisfied';
import Grid from '@material-ui/core/Grid';
import SentimentVerySatisfiedIcon from '@material-ui/icons/SentimentVerySatisfied';

const style = {
TextField :{
  width : '90%'
},
TextMemberAdd : {
  marginLeft: '8px'
}
}

const Members = ({ members }) => {
  if(!members){
      return
  }else{
  return(
      <div>
          <ul>
              {members.map((member)=>{
                  return <TextField
                  id="outlined-read-only-input"
                  defaultValue= {member}
                  style = {style.TextMemberAdd}
                  margin= "normal"
                  InputProps={{
                      startAdornment: (
                          <InputAdornment position="start">
                            <AccountCircle />
                          </InputAdornment>
                        ),
                      readOnly: true,
                  }}
                /> 
              })}
          </ul>
      </div>
  )
  }
}


const DiagMessage = ({diagMess})=> {
return(<DialogContentText style={{width: "85%"}}>{diagMess}</DialogContentText>)
}

export default({open,onClose}) => {
  const {oauth} = useContext(Context)
  const [member, setMember] = useState('')
  const [members, setMembers] = useState([])
  const [nameChannel, setNameChannel] = useState('')
  const [diagMess, setDiagMess] = useState('Please enter the name of the channel and participants you want to chat with.')
  const [smiley, setSmiley] = useState(false)
  
  const handleChangeMember = (event) => {
      setMember(event.target.value)
  }

  const handleChangeNameChannel = (event) => {
      setNameChannel(event.target.value)
  }

  const addMember = async () => {
      if(!member) return
      try{
        const {data : email} = await axios.get(`http://localhost:3001/users/byname/${member}`, {
          headers: {
           'Authorization': `Bearer ${oauth.access_token}`
          }
        })     
        if(email){
          setMembers([...members, email])
          setMember('')
        }
        else{
          setMember('')
          setDiagMess("Oops the person you're looking for doesn't exist")
          setSmiley(true)
        }
      }catch(err){
        setDiagMess('Oops an error occur, please try again')
        setSmiley(true)
      }
  }

  const handleCancelDialog = () => {
    onClose()
    setMember('')
    setMembers([])
    setDiagMess('Please enter the name of the channel and participants you want to chat with.')
    setSmiley(false)
  }

  const handleAddChannel =  async () => {
    if(nameChannel === ''){
      setDiagMess('Oops you forgot to give a name to your channel')
      setSmiley(true)
      return
    }

    try{
      let channel = {
      name : nameChannel,
      members : JSON.stringify(members)}
      await axios.post('http://localhost:3001/channels',channel,{
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${oauth.access_token}`
       }})

       setDiagMess('Please enter the name of the channel and participants you want to chat with.')
       setMembers([])
       setMember('')
       onclose()
       setSmiley(false)

    }catch(err){
      setDiagMess('Oops an error occur please try again ')
      setMembers([])
      setMember('')
      setSmiley(true)
    }
  }

  const Smiley = () => {
    if(smiley)
      return <>
        <SentimentVeryDissatisfiedIcon fontSize="large"/>
      </>
    else
      return <> <SentimentVerySatisfiedIcon fontSize="large"/></>
  }


  const buttonProps= {
    size : "small",
    variant:"contained",
    color: "primary",
    onClick : addMember
  }


  return (
      <div >
      <Dialog open={open} fullWidth={true} maxWidth ={'sm'} >
      <DialogTitle id="form-dialog-title">New Channel</DialogTitle>
      <DialogContent>
        <Grid container
        direction="row"
        justify="space-between"
        alignItems="center">
        <DiagMessage diagMess = {diagMess}/><Smiley/>
        </Grid>
        <TextField
          autoFocus
          required
          variant="outlined" 
          color = "primary"
          id="name"
          label="name of your channel"
          margin="normal"
          fullWidth
          onChange = {handleChangeNameChannel}
        />
          <Members members={members}/>
          <div css={style.member}>
            <TextField
              style= {style.TextField}
              variant="outlined"
              id="name"
              label="member"
              margin="normal"
              value = {member}
              onChange = {handleChangeMember}
            />
            <ResponsiveIconButton props={buttonProps} icon = {<AddCircleOutlineIcon/>}
              />
          </div>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleCancelDialog} color="primary">
          Cancel
        </Button>
        <Button onClick={handleAddChannel} color="primary">
          Create Channel
        </Button>
      </DialogActions>
    </Dialog>
      </div>
  )
}