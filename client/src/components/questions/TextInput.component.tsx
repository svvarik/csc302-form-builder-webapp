import { makeStyles, TextField } from '@material-ui/core'
import React from 'react'
import { BaseInputProps } from '../../types/Field.type'

const useStyles = makeStyles((theme) => ({
  input: {
    marginTop: theme.spacing(1),
  },
}))

const TextInput: React.FC<BaseInputProps> = (props) => {
  const classes = useStyles()

  const handleTextChange = (event: { target: { value: any } }) => {
    props.sendResponse({ response: event.target.value })
  }

  return (
    <div>
      <TextField
        data-cy='textInputTextField'
        className={classes.input}
        disabled
        required
        fullWidth
        onChange={handleTextChange}
      />
    </div>
  )
}

export default TextInput
