import React, { useState } from 'react'
import { DropzoneDialog } from 'material-ui-dropzone'
import Button from '@material-ui/core/Button'

import { toJson } from '../helpers'
import { useValueStream } from '../appContext/valueStreamContext'

const FileUpload = (props) => {
  const { initState } = useValueStream()

  const [state, setState] = useState({ files: [] })

  let fileReader

  const handleRead = (e) => {
    const data = toJson(fileReader.result)
    data ? initState(data) : console.log('File not JSON')
  }

  const handleFileChosen = (file) => {
    fileReader = new FileReader()
    fileReader.onloadend = handleRead
    fileReader.readAsText(file)
  }

  const handleClose = () => {
    setState({
      open: false,
    })
  }

  const handleSave = (files) => {
    //Saving files to state for further use and closing Modal.
    setState({
      files: files,
      open: false,
    })
    handleFileChosen(files[0])
    console.log(state.files)
  }

  const handleOpen = () => {
    setState({
      open: true,
    })
  }

  return (
    <div>
      <Button color="primary" onClick={handleOpen}>
        Load
      </Button>
      <DropzoneDialog
        open={state.open}
        onSave={handleSave}
        filesLimit={1}
        acceptedFiles={['application/json']}
        showPreviews={true}
        maxFileSize={5000000}
        onClose={handleClose}
        showPreviewsInFileUpload={false}
        showFileNames={true}
        previewText="File:"
      />
    </div>
  )
}

export default FileUpload
