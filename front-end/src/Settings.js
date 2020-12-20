import { useContext, useState } from 'react';
/** @jsx jsx */
import { jsx } from '@emotion/core';
import AccountCircle from '@material-ui/icons/AccountCircle';
import InputAdornment from '@material-ui/core/InputAdornment';
import { useTheme } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Context from './Context';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { ResponsiveButton } from './ResponsiveButton';
import Photo from './icons/photo.svg';
import axios from 'axios';
import Avatar from './Avatar';
import md5 from 'md5';
import OurAvatarDialog from './OurAvatarsDialog';
import beer from './icons/beer.svg';
import kitty from './icons/kitty.svg';
import masque from './icons/masque.svg';
import pet from './icons/pet.svg';
import snowM from './icons/planche-a-neige.svg';
import snowF from './icons/planche-a-neige-F.svg';
import DropZone from './DropZone';
import MenuItem from '@material-ui/core/MenuItem';
import Switch from '@material-ui/core/Switch';
import { FormControlLabel, FormGroup } from '@material-ui/core';

const useStyles = (theme) => ({
  root: {
    backgroundColor: theme.palette.secondary.main,
    flex: '1 1 auto',
    display: 'flex',
    height: '100%'
  }
})

const Image = ({ image, theme }) => {
  const style = ({
    width: '70px',
    heigh: '70px',
    borderRadius: '50%',
    border: '1px solid',
    borderColor: theme.palette.secondary.light,
    marginBottom: '10px'
  })

  return <img alt="Welcome" src={image} css={style} />
}


const languages = [
  {
    value: 'EN',
    label: 'English',
  },
  {
    value: 'FR',
    label: 'Fançais',
  },
  {
    value: 'IT',
    label: 'Italiano',
  },
  {
    value: 'SAN',
    label: 'Sanskrit',
  }, {
    value: 'NA',
    label: "Na'vi"
  }
]

//TODO : verifier la validité de l'username
export default () => {
  const theme = useTheme()
  const styles = useStyles(theme)
  const { oauth, setOauth } = useContext(Context)
  const [username, setUserName] = useState('')
  const [userMessage, setUserMessage] = useState('You can change your username here')
  const [imageMessage, setImageMessage] = useState("Choose a way to change your Avatar if you want and look at the result below!")
  const [openAvatar, setOpenAvatar] = useState(false)
  const [openDZ, setOpenDZ] = useState(false)
  const [image, setImage] = useState(Photo)
  //oauth.settings.language
  const [language, setLanguage] = useState(oauth && oauth.settings.language ? oauth.settings.language : null)
  //oauth.settings.mode
  const [switchState, setSwitchState] = useState(oauth && oauth.settings.mode ? oauth.settings.mode : null)


  const [nameSwitch, setNameSwitch] = useState(oauth && oauth.settings.mode ? 'Light Mode' : 'Dark Mode')


  const checkSwitch = () => {
    if (!switchState) {
      setNameSwitch('Light Mode')
    } else {
      setNameSwitch('Dark Mode')
    }
  }

  const handleChangeUsername = (event) => {
    setUserName(event.target.value)
  }

  const handleChangeLanguage = (event) => {
    setLanguage(event.target.value);
  };

  const handleChangeSwitch = () => {
    setSwitchState(!switchState)
    checkSwitch()
  }



  const handleGravatar = async () => {
    const hashEmail = md5((oauth.email).toLowerCase())
    axios.get(`https://www.gravatar.com/avatar/${hashEmail}`, {
      responseType: 'arraybuffer'
    })
      .then(response => {
        const buffer = Buffer.from(response.data, 'binary').toString('base64');
        setImage(`data:image/svg;base64,${buffer}`)
        setImageMessage('Wow... what a beautiful Gravatar')
      })
      .catch((err) => {
        setImageMessage('Oops an error with your gravatar occur please try again')
      })
  }

  const handleOurAvatar = () => {
    setOpenAvatar(true)
  }

  const handleCloseOurAvatar = () => {
    setOpenAvatar(false)
  }

  const handleDropZoneAvatar = () => {
    setOpenDZ(true)
  }

  const handleCloseDZ = () => {
    setOpenDZ(false)
  }

  const handleCase = (image) => {
    axios.get(image, {
      responseType: 'blob'
    })
      .then(response => {
        const reader = new FileReader();
        reader.readAsDataURL(response.data);
        reader.onload = () => {
          setImage(reader.result)
          setImageMessage('Wow... what a beautiful Avatar')
        }
      })
      .catch((err) => {
        setImageMessage('Oops an error with your gravatar occur please try again')
      })
  }

  const handleSetNumber = (number) => {
    switch (number) {
      case 1:
        handleCase(snowF)
        break;
      case 2:
        handleCase(snowM)
        break;
      case 3:
        handleCase(beer)
        break;
      case 4:
        handleCase(kitty)
        break;
      case 5:
        handleCase(pet)
        break;
      case 6:
        handleCase(masque)
        break;
      default:
        setImageMessage('Oops an error occur... try again')
    }
  }

  const handleSetImageDrop = (image) => {
    setImage(image)
    setImageMessage('Wow... what a beautiful Avatar')
  }

  const handleNewUsername = async () => {
    if (!username) {
      setUserMessage('Ohoh it looks like you forgot to enter your username')
    } else {
      try {
        const data = {
          name: username,
        }
        const email64 = window.btoa(oauth.email)
        const user = await axios.put(`http://localhost:3001/users/${email64}`, data, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${oauth.access_token}`
          }
        })
        console.log(user)
        oauth.user = user.data
        setOauth(oauth)
        setUserMessage('Username updated')
      } catch (err) {
        setUserMessage('Oops an error occur try again..')
      }
    }
  }

  const handleNewSettings = async () => {
    try {
      const data = {
        language: language,
        mode: switchState
      }
      const email64 = window.btoa(oauth.email)
      const settings = await axios.post(`http://localhost:3001/users/${email64}/settings`, data, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${oauth.access_token}`
        }
      })
      oauth.settings = settings.data
      setOauth(oauth)
      setUserMessage('Settings updated')
    } catch (err) {
      setUserMessage('Oops an error occur try again..')
    }
  }


  const handleNewAvatar = async () => {
    if (Object.is(image, Photo)) {
      setImageMessage('Ohoh it looks like you forgot to choose your avatar')
    } else {
      try {
        const data = {
          avatar: image
        }
        const email64 = window.btoa(oauth.email)
        const user = await axios.put(`http://localhost:3001/users/${email64}`, data, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${oauth.access_token}`
          }
        })
        setImageMessage('Avatar updated!')
        oauth.user = user.data
        setOauth(oauth)
      } catch (err) {
        setImageMessage('Oops an error occur try again..')
      }
    }
  }


  const propsUsernameButton = {
    size: "large",
    variant: "contained",
    color: "primary",
    onClick: handleNewUsername
  }


  const propsSetButton = {
    size: "large",
    variant: "contained",
    color: "primary",
    onClick: handleNewSettings
  }

  const propsAvatarButton = {
    size: "large",
    variant: "contained",
    color: "primary",
    onClick: handleNewAvatar
  }

  return (
    <div css={styles.root}>
      <Grid
        container
        direction="column"
        justify="center"
        alignItems="center"
      >
        <Typography color="textPrimary" variant="h5">
          {userMessage}
        </Typography>
        <div css={{ marginBottom: '20px' }}>
          <Grid container
            direction="row"
            alignItems="center"
            justify="flex-end"
            spacing={3}
          >
            <Grid item>
              <TextField
                autoFocus
                required
                variant="outlined"
                color="primary"
                id="name"
                label="username"
                margin="normal"
                onChange={handleChangeUsername}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <AccountCircle />
                    </InputAdornment>
                  )
                }}
              />
            </Grid>
            <Grid item>
              <ResponsiveButton name={'Send new Username'} props={propsUsernameButton} />
            </Grid>
          </Grid>
        </div>
        <div>
          <Grid container
            direction="row"
            justify="center"
            alignItems="flex-start"
            spacing={2}>
            <Grid item >
              <TextField
                select
                label="Select"
                variant="outlined"
                value={language}
                onChange={handleChangeLanguage}
                helperText="Please select your language"
              >
                {languages.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item>
              <FormGroup row>
                <FormControlLabel
                  control={<Switch
                    checked={switchState}
                    onChange={handleChangeSwitch}
                    label={nameSwitch}
                    color="primary"
                  />}
                  label={nameSwitch}
                  labelPlacement="start" />
              </FormGroup>
            </Grid>
            <Grid item>
              <ResponsiveButton name="send Settings" props={propsSetButton} />
            </Grid>
          </Grid>
        </div>
        <Avatar HandleButton1={handleGravatar} HandleButton2={handleOurAvatar} HandleButton3={handleDropZoneAvatar} />
        <OurAvatarDialog open={openAvatar} onClose={handleCloseOurAvatar} handleSetNumber={handleSetNumber} aria-labelledby="form-dialog-title" />
        <DropZone open={openDZ} onClose={handleCloseDZ} setImage={handleSetImageDrop} />
        <Typography color="textPrimary" variant="h5">
          {imageMessage}
        </Typography>
        <Image image={image} theme={theme} />
        <ResponsiveButton name={'Send new avatar'} props={propsAvatarButton} />
      </Grid>
    </div>
  )
}