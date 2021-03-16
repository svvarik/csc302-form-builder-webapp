import React, { useState } from 'react'
import { v4 as uuidv4 } from 'uuid'
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  TextField,
  Button,
  makeStyles,
} from '@material-ui/core'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import { SectionProps } from '../types/Section.type'
import Field from './Field.component'

interface FieldInfo {
  title: string
  type: string
  response: string
  options: Array<string>
  fieldId: string
}

const useStyles = makeStyles((theme) => ({
  centeredRow: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    flexWrap: 'wrap',
  },
}))

const Section: React.FC<SectionProps> = (props) => {
  const classes = useStyles()
  const [title, setTitle] = useState()
  const [fields, setFields] = useState<Array<FieldInfo>>([])

  const getFieldState = (val: any): void => {
    const updatedFields: Array<FieldInfo> = fields
    updatedFields.forEach((field) => {
      if (val.fieldId === field.fieldId) {
        field = val // eslint-disable-line no-param-reassign
      }
    })
    setFields(updatedFields)
  }

  const addField = () => {
    setFields([
      ...fields,
      { fieldId: uuidv4(), title: '', type: '', response: '', options: [] },
    ])
  }

  const handleTitleChange = (event: { target: { value: any } }) => {
    setTitle(event.target.value)
  }

  return (
    <div>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls='panel1a-content'
          id='panel1a-header'
        >
          <TextField
            id='standard-basic'
            label='Section Title'
            onClick={(event) => event.stopPropagation()}
            onFocus={(event) => event.stopPropagation()}
            onChange={handleTitleChange}
          />
        </AccordionSummary>
        <AccordionDetails className={classes.centeredRow}>
          {fields.map((field) => {
            return <Field sendData={getFieldState} fieldId={field.fieldId} />
          })}
          <Button color='primary' onClick={addField}>
            + Add Field
          </Button>
        </AccordionDetails>
      </Accordion>
    </div>
  )
}

export default Section
