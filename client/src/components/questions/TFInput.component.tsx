import {
  FormControl,
  RadioGroup,
  FormControlLabel,
  Radio,
  makeStyles,
} from '@material-ui/core'
import React, { useState } from 'react'
import { BaseInputProps } from '../../types/Field.type'

const useStyles = makeStyles((theme) => ({
  input: {
    marginTop: theme.spacing(1),
  },
}))

const TFInput: React.FC<BaseInputProps> = (props) => {
  const classes = useStyles()

  const { enabled, response } = props

  const [enabledState, setEnabled] = useState(enabled)
  const [value, setValue] = useState('')

  const handleTFChange = (event: { target: { value: any } }) => {
    setValue(event.target.value)
    props.sendResponse({ response: event.target.value })
  }

  if (enabledState === false) {
    return (
      <div>
        <FormControl className={classes.input}>
          <RadioGroup value={response} data-cy='tfInputRadioGroup'>
            <FormControlLabel
              data-cy='tfInputTrue'
              disabled
              value='True'
              control={<Radio color='primary' />}
              label='True'
            />
            <FormControlLabel
              data-cy='tfInputFalse'
              disabled
              value='False'
              control={<Radio color='primary' />}
              label='False'
            />
          </RadioGroup>
        </FormControl>
      </div>
    )
  }
  return (
    <div>
      <FormControl className={classes.input}>
        <RadioGroup
          onChange={handleTFChange}
          value={value}
          data-cy='tfInputRadioGroup'
        >
          <FormControlLabel
            data-cy='tfInputTrue'
            value='True'
            control={<Radio color='primary' />}
            label='True'
          />
          <FormControlLabel
            data-cy='tfInputFalse'
            value='False'
            control={<Radio color='primary' />}
            label='False'
          />
        </RadioGroup>
      </FormControl>
    </div>
  )
}

export default TFInput
