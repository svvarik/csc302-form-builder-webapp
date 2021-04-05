import React, { useState, useEffect } from 'react'
import { v4 as uuidv4 } from 'uuid' // eslint-disable-line import/no-extraneous-dependencies
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  TextField,
  makeStyles,
} from '@material-ui/core'
import AddCircleRoundedIcon from '@material-ui/icons/AddCircleRounded'
import { SectionProps } from '../../types/Section.type'
import FieldTemplate from './FieldTemplate.component'
import Add from '../Add.component'
import { FieldInfo } from '../../types/Field.type'

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
    margin: theme.spacing(3, 0),
  },
  summary: {
    display: 'flex',
    alignItems: 'center',
    margin: theme.spacing(2, 0),
  },
}))

const SectionTemplate: React.FC<SectionProps> = (props) => {
  const classes = useStyles()

  const { sectionData } = props

  const [title, setTitle] = useState(sectionData ? sectionData.title : '')
  const [fields, setFields] = useState<Array<FieldInfo>>(
    sectionData ? sectionData.fields : []
  )

  // alert(title)

  useEffect(() => {
    const { sectionID: id } = props
    props.sendData({
      title,
      fields,
      sectionID: id,
      sections: [], // This is to model recursive section structure, but is right now set off
    })
  }, [title, fields])

  const getFieldState = (val: any): void => {
    const updatedFields: Array<FieldInfo> = [...fields]
    const updatedIndex = fields.findIndex(
      (field) => field.fieldID === val.fieldID
    )
    updatedFields[updatedIndex] = val
    setFields(updatedFields)
  }

  const addField = () => {
    setFields([
      ...fields,
      { fieldID: uuidv4(), title: '', type: '', response: '', options: [] },
    ])
  }

  const handleTitleChange = (event: { target: { value: any } }) => {
    setTitle(event.target.value)
  }

  return (
    <div className={classes.root} data-cy='sectionTemplate'>
      <Accordion elevation={3}>
        <AccordionSummary
          expandIcon={<AddCircleRoundedIcon data-cy='expandMore' />}
          aria-controls='panel1a-content'
          id='panel1a-header'
          className={classes.summary}
        >
          <TextField
            id='standard-basic'
            label='Section Title'
            data-cy='sectionTitle'
            inputProps={{ style: { fontSize: 18 } }}
            onClick={(event) => event.stopPropagation()}
            onFocus={(event) => event.stopPropagation()}
            onChange={handleTitleChange}
            value={title}
          />
        </AccordionSummary>
        <AccordionDetails className={classes.container}>
          {fields.map((field) => {
            return (
              <div className={classes.fieldRow}>
                <FieldTemplate
                  key={field.fieldID}
                  sendData={getFieldState}
                  fieldID={field.fieldID}
                  fieldData={field}
                />
              </div>
            )
          })}
          <Add sendClick={addField} prompt='Field' />
        </AccordionDetails>
      </Accordion>
    </div>
  )
}

export default SectionTemplate
