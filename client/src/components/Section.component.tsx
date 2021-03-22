import React, { useState, useEffect } from 'react'
import { v4 as uuidv4 } from 'uuid' // eslint-disable-line import/no-extraneous-dependencies
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  TextField,
  Button,
  makeStyles,
} from '@material-ui/core'
import AddCircleRoundedIcon from '@material-ui/icons/AddCircleRounded'
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
  root: {
    width: '100%',
    marginTop: '2em',
  },
  container: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    flexWrap: 'wrap',
  },
  fieldRow: {
    flexBasis: '100%',
    margin: theme.spacing(5, 0),
  },
  addButton: {
    marginTop: '.5em',
  },
  summary: {
    display: 'flex',
    alignItems: 'center',
    margin: theme.spacing(2, 0),
  },
}))

const Section: React.FC<SectionProps> = (props) => {
  const classes = useStyles()
  const [title, setTitle] = useState()
  const [fields, setFields] = useState<Array<FieldInfo>>([])

  useEffect(() => {
    const { sectionId: id } = props
    props.sendData({
      title,
      fields,
      sectionId: id,
      sections: [], // This is to model recursive section structure, but is right now set off
    })
  }, [title, fields])

  const getFieldState = (val: any): void => {
    const updatedFields: Array<FieldInfo> = [...fields]
    const updatedIndex = fields.findIndex(
      (field) => field.fieldId === val.fieldId
    )
    updatedFields[updatedIndex] = val
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
    <div className={classes.root}>
      <Accordion elevation={3}>
        <AccordionSummary
          expandIcon={<AddCircleRoundedIcon />}
          data-cy='expandMore'
          aria-controls='panel1a-content'
          id='panel1a-header'
          className={classes.summary}
        >
          <TextField
            id='standard-basic'
            label='Section Title'
            data-cy='sectionTitle'
            onClick={(event) => event.stopPropagation()}
            onFocus={(event) => event.stopPropagation()}
            onChange={handleTitleChange}
          />
        </AccordionSummary>
        <AccordionDetails className={classes.container}>
          {fields.map((field) => {
            return (
              <div className={classes.fieldRow}>
                <Field
                  key={field.fieldId}
                  sendData={getFieldState}
                  fieldId={field.fieldId}
                />
              </div>
            )
          })}
          <Button
            className={classes.addButton}
            color='primary'
            data-cy='addField'
            onClick={addField}
          >
            + Add Field
          </Button>
        </AccordionDetails>
      </Accordion>
    </div>
  )
}

export default Section
