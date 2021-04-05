import { makeStyles } from '@material-ui/core'
import React, { useState } from 'react'
import NumberFormat from 'react-number-format'
import { BaseInputProps } from '../../types/Field.type'

const useStyles = makeStyles((theme) => ({
  input: {
    marginTop: theme.spacing(1),
  },
}))

const NumInput: React.FC<BaseInputProps> = (props) => {
  const classes = useStyles()
  const { enabled, response } = props

  const [enabledState, setEnabled] = useState(enabled)

  const handleNumChange = (event: { target: { value: any } }) => {
    props.sendResponse({ response: event.target.value })
  }

  if (enabledState === false) {
    return (
      <div>
        <NumberFormat
          data-cy='numInputNumFormat'
          className={classes.input}
          thousandSeparator
          disabled
          value={response as string | number}
          onChange={handleNumChange}
        />
      </div>
    )
  }
  return (
    <div>
      <NumberFormat
        data-cy='numInputNumFormat'
        className={classes.input}
        thousandSeparator
        onChange={handleNumChange}
      />
    </div>
  )
}

export default NumInput
