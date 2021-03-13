import {
  FormControl,
  RadioGroup,
  FormControlLabel,
  Radio,
  makeStyles,
} from '@material-ui/core'
import React from 'react'
import { BaseInputProps } from '../../types/Field.type'

const useStyles = makeStyles((theme) => ({
  input: {
    marginTop: theme.spacing(1),
  },
}))

const TFInput: React.FC<BaseInputProps> = (props) => {
  const classes = useStyles()

  const handleTFChange = (event: { target: { value: any } }) => {
    props.sendResponse({ response: event.target.value })
  }

  return (
    <div>
      <FormControl className={classes.input}>
        <RadioGroup onChange={handleTFChange} data-cy='tfInputRadioGroup'>
          <FormControlLabel
            data-cy='tfInputTrue'
            disabled
            value='True'
            control={<Radio />}
            label='True'
          />
          <FormControlLabel
            data-cy='tfInputFalse'
            disabled
            value='False'
            control={<Radio />}
            label='False'
          />
        </RadioGroup>
      </FormControl>
    </div>
  )
}

export default TFInput
