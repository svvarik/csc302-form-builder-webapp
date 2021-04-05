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

  const { enabled, response } = props

  const [enabledState, setEnabled] = React.useState(enabled)
  const handleTextChange = (event: { target: { value: any } }) => {
    props.sendResponse({ response: event.target.value })
  }

  if (enabledState === false) {
    return (
      <div>
        <TextField
          data-cy='textInputTextField'
          className={classes.input}
          disabled
          required
          fullWidth
          value={response}
          onChange={handleTextChange}
        />
      </div>
    )
  }
  return (
    <div>
      <TextField
        data-cy='textInputTextField'
        className={classes.input}
        required
        fullWidth
        onChange={handleTextChange}
      />
    </div>
  )
}

export default TextInput
