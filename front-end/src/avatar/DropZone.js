import React, { useMemo } from 'react'
import { useDropzone } from 'react-dropzone'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
import Button from '@material-ui/core/Button'
import DialogContentText from '@material-ui/core/DialogContentText'


const baseStyle = {
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: '20px',
  borderWidth: 2,
  borderRadius: 2,
  borderColor: '#eeeeee',
  borderStyle: 'dashed',
  backgroundColor: '#fafafa',
  color: '#bdbdbd',
  outline: 'none',
  transition: 'border .24s ease-in-out'
}

const activeStyle = {
  borderColor: '#2196f3'
}

const acceptStyle = {
  borderColor: '#00e676'
}

const rejectStyle = {
  borderColor: '#ff1744'
}

const DiagMessage = ({ diagMess }) => {
  return (<DialogContentText style={{ width: "85%" }}>{diagMess}</DialogContentText>)
}

const MyDropzone = ({ maxSize, setImage, onClose }) => {
  const {
    getRootProps,
    getInputProps,
    acceptedFiles,
    isDragActive,
    isDragAccept,
    isDragReject
  } = useDropzone({ accept: 'image/*', maxFile: 1, maxSize: 30000 })

  const style = useMemo(() => ({
    ...baseStyle,
    ...(isDragActive ? activeStyle : {}),
    ...(isDragAccept ? acceptStyle : {}),
    ...(isDragReject ? rejectStyle : {})
  }), [
    isDragActive,
    isDragReject,
    isDragAccept
  ])

  const acceptedFileItems = () => {
    acceptedFiles.forEach(file => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        setImage(reader.result)
        onClose()
      }
    })
  }

  return (
    <div className="container">
      <div {...getRootProps({ style })}>
        <input {...getInputProps()} />
        <p>Drag 'n' drop some files here, or click to select files</p>
      </div>
      {acceptedFileItems()}
    </div>
  )
}

export default ({ open, setImage, onClose }) => {
  const message = 'Chose an image maximum size 30ko'
  const handleCancelDialog = () => {
    onClose()
  }

  return (<div>
    <Dialog open={open} fullWidth={true} maxWidth={'lg'} >
      <DialogTitle id="form-dialog-title">Drop an Image</DialogTitle>
      <DialogContent>
        <DiagMessage diagMess={message} />
        <MyDropzone setImage={setImage} onClose={onClose} />

      </DialogContent>
      <DialogActions>
        <Button onClick={handleCancelDialog} color="primary">
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  </div>)
}