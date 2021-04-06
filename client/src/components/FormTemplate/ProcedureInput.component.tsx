/* eslint-disable no-use-before-define */
import React, { useState, useEffect, useRef } from 'react'
import Autocomplete, {
  createFilterOptions,
} from '@material-ui/lab/Autocomplete'
import {
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from '@material-ui/core'
import { v4 as uuidv4 } from 'uuid' // eslint-disable-line import/no-extraneous-dependencies
import { getProcedures, addProcedure, getProcedureById } from '../../requests'
import { ProcedureInputProps, ProcedureType } from '../../types/Procedure.type'

const filter = createFilterOptions<ProcedureType>()

const ProcedureInput: React.FC<ProcedureInputProps> = (props) => {
  const procedureFlag = useRef(0)
  const [procedures, setProcedures] = useState<Array<ProcedureType>>([])
  const [value, setValue] = useState<ProcedureType | null>()
  const [open, toggleOpen] = useState(false)
  const [dialogValue, setDialogValue] = useState('')

  const handleClose = () => {
    setDialogValue('')
    toggleOpen(false)
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const newProcedure = {
      procedure: dialogValue,
      id: uuidv4(),
    }
    setValue(newProcedure)
    setProcedures([...procedures, newProcedure])
    addProcedure(newProcedure)
    handleClose()
  }

  /**
   * Get all procedures from database
   */
  useEffect(() => {
    const fetchData = async () => {
      const fetchedProcedures = await (await getProcedures()).json()
      setProcedures(fetchedProcedures)
    }
    console.log(props.procedureId)
    fetchData()
  }, [procedureFlag])

  /**
   * Sends data back up to parent component
   */
  useEffect(() => {
    if (value && value.id) {
      props.sendData(value.id)
    }
  }, [value])

  return (
    <div>
      <Autocomplete
        value={value}
        onChange={(event, newValue) => {
          if (typeof newValue === 'string') {
            setTimeout(() => {
              toggleOpen(true)
              setDialogValue(newValue)
            })
          } else if (newValue && newValue.inputValue) {
            // Create a new value from the user input
            toggleOpen(true)

            setDialogValue(newValue.inputValue)
          } else {
            setValue(newValue)
          }
        }}
        filterOptions={(options, params) => {
          const filtered = filter(options, params)

          // Suggest the creation of a new value
          if (params.inputValue !== '') {
            filtered.push({
              inputValue: params.inputValue,
              procedure: `Add '${params.inputValue}'`,
            })
          }

          return filtered
        }}
        selectOnFocus
        clearOnBlur
        handleHomeEndKeys
        id='procedure'
        options={procedures}
        getOptionLabel={(option) => {
          // Value selected with enter, right from the input
          if (typeof option === 'string') {
            return option
          }
          // Add 'xxx' option created dynamically
          if (option.inputValue) {
            return option.inputValue
          }
          // Regular option
          return option.procedure
        }}
        renderOption={(option) => option.procedure}
        style={{ width: '100%' }}
        freeSolo
        renderInput={(params) => (
          <TextField {...params} label='Procedure' variant='standard' />
        )}
      />
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby='form-dialog-title'
      >
        <form onSubmit={handleSubmit}>
          <DialogTitle id='form-dialog-title'>Add a new procedure</DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              margin='dense'
              id='name'
              value={dialogValue}
              onChange={(event) => setDialogValue(event.target.value)}
              label='title'
              type='text'
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color='primary'>
              Cancel
            </Button>
            <Button type='submit' color='primary'>
              Add
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </div>
  )
}

export default ProcedureInput
