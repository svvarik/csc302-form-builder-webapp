import { makeStyles } from '@material-ui/core'
import React from 'react'
import NumberFormat from 'react-number-format'
import { BaseInputProps } from '../../types/Field.type'

const useStyles = makeStyles((theme) => ({
  input: {
    marginTop: theme.spacing(1),
  },
}))

const NumInput: React.FC<BaseInputProps> = (props) => {
  const classes = useStyles()

  const handleNumChange = (event: { target: { value: any } }) => {
    props.sendResponse({ response: event.target.value })
  }

  return (
    <div>
      <NumberFormat
        data-cy='numInputNumFormat'
        className={classes.input}
        thousandSeparator
        disabled
        onChange={handleNumChange}
      />
    </div>
  )
}

export default NumInput
