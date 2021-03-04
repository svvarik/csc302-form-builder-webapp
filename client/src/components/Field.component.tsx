import React, { useState, useEffect } from 'react'
import {
  MenuItem,
  TextField,
  Select,
  InputLabel,
  FormControl,
} from '@material-ui/core'
import { FieldProps } from '../types/Field.type'
import '../css/Field.css'
// import SaveRequest from '../requests'

const Field: React.FC<FieldProps> = (props) => {
  const [typeState, setType] = React.useState('')
  const [titleState, setTitle] = React.useState('')

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
      <FormControl className='dropdown'>
        <InputLabel>Type</InputLabel>
        <Select value={typeState} onChange={handleTypeChange}>
          <MenuItem value='TEXT'>Text</MenuItem>
          <MenuItem value='INT'>Integer</MenuItem>
          <MenuItem value='MC'>Multiple Choice</MenuItem>
          <MenuItem value='TF'>True/False</MenuItem>
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
    <div className='column field-box'>
      <div
        className='centered-row'
        style={{
          whiteSpace: 'nowrap',
          overflow: 'hidden',
        }}
      >
        <div className='field-title'>Field title</div>
        <TextField required fullWidth onChange={handleTitleChange} />
      </div>
      <div>{renderDropdown()}</div>
      <div>{renderQuestion()}</div>
    </div>
  )
}

export default Field
