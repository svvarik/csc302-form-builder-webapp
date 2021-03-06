import React, { useState, useEffect } from 'react'
import {
  MenuItem,
  TextField,
  Select,
  InputLabel,
  FormControl,
  makeStyles,
} from '@material-ui/core'
import { FieldProps } from '../types/Field.type'
// import SaveRequest from '../requests'

const useStyles = makeStyles((theme) => ({
  centeredRow: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
  },
  fieldBox: {
    display: 'flex',
    flexDirection: 'column',
    border: '2px solid #828282',
    borderRadius: theme.spacing(2),
    padding: theme.spacing(2),
  },
  dropdown: {
    width: '20%',
    minWidth: '100px',
  },
  fieldTitle: {
    marginRight: theme.spacing(3),
  },
}))

const Field: React.FC<FieldProps> = (props) => {
  const classes = useStyles()
  const [typeState, setType] = useState('')
  const [titleState, setTitle] = useState('')

  useEffect(() => {
    props.sendData({ title: titleState, type: typeState })
  })

  const handleTypeChange = (event: { target: { value: any } }) => {
    setType(event.target.value)
  }

  const handleTitleChange = (event: { target: { value: any } }) => {
    setTitle(event.target.value)
  }

  const renderDropdown = () => {
    return (
      <FormControl className={classes.dropdown}>
        <InputLabel>Type</InputLabel>
        <Select
          data-cy='formMenuItemSelector'
          value={typeState}
          onChange={handleTypeChange}
        >
          <MenuItem data-cy='formMenuItemText' value='TEXT'>
            Text
          </MenuItem>
          <MenuItem data-cy='formMenuItemInt' value='INT'>
            Integer
          </MenuItem>
          <MenuItem data-cy='formMenuItemMC' value='MC'>
            Multiple Choice
          </MenuItem>
          <MenuItem data-cy='formMenuItemTF' value='TF'>
            True/False
          </MenuItem>
        </Select>
      </FormControl>
    )
  }

  const renderQuestion = () => {
    switch (typeState) {
      case 'TEXT':
        return <div>I am a Text Question</div>
      case 'INT':
        return <div>I am a Integer Question</div>
      case 'MC':
        return <div>I am a Multiple Choice Question</div>
      case 'TF':
        return <div>I am a True/False Question</div>
      default:
        return <div>No q selected</div>
    }
  }

  return (
    <div data-cy='fieldBox' className={classes.fieldBox}>
      <div className={classes.centeredRow}>
        <div data-cy='fieldTitle' className={classes.fieldTitle}>
          {titleState || 'FIELD TITLE'}
        </div>
        <TextField
          data-cy='titleTextField'
          required
          fullWidth
          onChange={handleTitleChange}
        />
      </div>
      <div data-cy='fieldDropdown'>{renderDropdown()}</div>
      <div data-cy='fieldQuestion'>{renderQuestion()}</div>
    </div>
  )
}

export default Field
