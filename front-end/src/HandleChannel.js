import React from 'react'
import { useState, useContext, useEffect } from 'react'
import Context from './Context'
import axios from 'axios'
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import AccountCircle from '@material-ui/icons/AccountCircle'
import InputAdornment from '@material-ui/core/InputAdornment'
import { ResponsiveIconButton } from './ResponsiveButton'
import SentimentVeryDissatisfiedIcon from '@material-ui/icons/SentimentVeryDissatisfied'
import Grid from '@material-ui/core/Grid';
import SentimentVerySatisfiedIcon from '@material-ui/icons/SentimentVerySatisfied'


const style = {
  TextField: {
    width: '90%'
  },
  TextMemberAdd: {
    marginLeft: '8px',
    display: "flex",
    alignItems: "center"
  }
}

const Members = ({ members }) => {
  if (!members) {
    return
  } else {
    return (
      <div>
        <ul>
          {members.map((member) => {
            return <TextField
              id="outlined-read-only-input"
              defaultValue={member}
              style={style.TextMemberAdd}
              margin="normal"
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

const DiagMessage = ({ diagMess }) => {
  return (<DialogContentText style={{ width: "85%" }}>{diagMess}</DialogContentText>)
}

export default ({ open, onClose, channel }) => {
  const { oauth, channels, setChannels } = useContext(Context)
  const [member, setMember] = useState('')
  const [members, setMembers] = useState([])
  const [userNameMembers, setUsernameMember] = useState([])
  const [nameChannel, setNameChannel] = useState('')
  const [diagMess, setDiagMess] = useState()
  const owner = channel ? ((channel.owner === oauth.user.id) ? true : false) : false
  const [smiley, setSmiley] = useState(false)

  const handleChangeMember = (event) => {
    setMember(event.target.value)
  }

  useEffect(() => {
    setMembers(channel ? [...channel.members] : [])
    setUsernameMember(channel ? [...channel.members] : [])
    setNameChannel(channel ? channel.name : '')
    setDiagMess(channel ? ' If you are owner of this channel you are able to modify if' : 'Please enter the name of the channel and participants you want to chat with.')
  }, [channel])

  const handleChangeNameChannel = (event) => {
    setNameChannel(event.target.value)
  }

  const addMember = async () => {
    if (!member) return
    try {
      const { data: email } = await axios.get(`http://localhost:3001/users/byname/${member}`, {
        headers: {
          'Authorization': `Bearer ${oauth.access_token}`
        }
      })
      if (email) {
        setUsernameMember([...userNameMembers, member])
        setMembers([...members, email])
        setMember('')
      }
      else {
        setMember('')
        setDiagMess("Oops the person you're looking for doesn't exist")
        setSmiley(true)
      }
    } catch (err) {
      setDiagMess('Oops an error occur, please try again')
      setSmiley(true)
    }
  }

  const handleCancelDialog = () => {
    onClose()
    setMember('')
    setUsernameMember([])
    setMembers([])
    setDiagMess('Please enter the name of the channel and participants you want to chat with.')
    setSmiley(false)
  }

  const handleAddChannel = async () => {
    if (nameChannel === '') {
      setDiagMess('Oops you forgot to give a name to your channel')
      setSmiley(true)
      return
    }
    try {
      let channel = {
        name: nameChannel,
        members: members
      }
      const res = await axios.post('http://localhost:3001/channels', channel, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${oauth.access_token}`
        }
      })
      setChannels([...channels, res.data])
      onClose()
      setDiagMess('Please enter the name of the channel and participants you want to chat with.')
      setMembers([])
      setUsernameMember([])
      setMember('')
      setSmiley(false)

    } catch (err) {
      setDiagMess('Oops an error occur please try again ')
      setSmiley(true)
    }

  }

  const Smiley = () => {
    if (smiley)
      return <>
        <SentimentVeryDissatisfiedIcon fontSize="large" />
      </>
    else
      return <> <SentimentVerySatisfiedIcon fontSize="large" /></>
  }

  const handleDeleteChannel = async () => {
    try {
      await axios.delete(`http://localhost:3001/channels/${channel.id}`, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${oauth.access_token}`
        }
      })
      setChannels(channels.filter(ch => ch.id !== channel.id))
      onClose()
      setDiagMess('Please enter the name of the channel and participants you want to chat with.')
      setMembers([])
      setUsernameMember([])
      setMember('')
      setSmiley(false)

    } catch (err) {
      console.log(err)
      setDiagMess('Oops an error occur please try again ')
      setSmiley(true)
    }
  }

  const handleLeaveChannel = async () => {
    try {
      await axios.delete(`http://localhost:3001/channels/${channel.id}/${oauth.user.id}`, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${oauth.access_token}`
        }
      })
      onClose()
      setDiagMess('Please enter the name of the channel and participants you want to chat with.')
      setMembers([])
      setUsernameMember([])
      setMember('')
      setSmiley(false)
      
    } catch (err) {
      console.log(err)
      setDiagMess('Oops an error occur please try again ')
      setSmiley(true)
    }
  }

  const buttonAddProps = {
    variant: "contained",
    color: "default",
    onClick: addMember
  }

  return (
    <div >
      <Dialog open={open} fullWidth={true} maxWidth={'sm'} >
        <DialogTitle id="form-dialog-title">{channel ? 'Settings Channel' : 'New Channel'}</DialogTitle>
        <DialogContent>
          <Grid container
            direction="row"
            justify="center"
            alignItems="center">
            <DiagMessage diagMess={diagMess} /><Smiley />
          </Grid>
          <TextField
            autoFocus
            required={channel ? false : true}
            disabled={channel ? (owner ? false : true) : false}
            variant="outlined"
            color="primary"
            id="name"
            label="name of your channel"
            defaultValue={channel ? nameChannel : null}
            margin="normal"
            fullWidth
            onChange={handleChangeNameChannel}
          />
          <Members members={userNameMembers} />
          <div>
            <Grid
              container
              direction="row"
              justify="space-between"
              alignItems="center">

              <TextField
                disabled={channel ? (owner ? false : true) : false}
                style={style.TextField}
                variant="outlined"
                id="name"
                label="member"
                margin="normal"
                value={member}
                onChange={handleChangeMember}
              />
              <ResponsiveIconButton props={buttonAddProps} icon={<AddCircleOutlineIcon />}
              />
            </Grid>
          </div>
        </DialogContent>
        <DialogActions>
          {channel ? (owner ? <Button onClick={handleDeleteChannel}>Delete the channel</Button> : <Button onClick={handleLeaveChannel}>Leave the channel</Button>) : null}
          <Button onClick={handleCancelDialog} >
            Cancel
        </Button>
          <Button onClick={handleAddChannel}>
            {channel ? 'Modify the channel' : 'Create Channel'}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}