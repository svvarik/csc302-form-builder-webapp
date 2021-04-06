import React, { useState, useEffect } from 'react'
import { v4 as uuidv4 } from 'uuid' // eslint-disable-line import/no-extraneous-dependencies
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  makeStyles,
  Typography,
} from '@material-ui/core'
import AddCircleRoundedIcon from '@material-ui/icons/AddCircleRounded'
import { SectionResponseProps } from '../../types/SectionResponse.type'
import FieldFormFiller from './FieldFormFiller.component'
import { FieldFormFillerProps } from '../../types/FieldFormFiller.type'

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

const SectionResponse: React.FC<SectionResponseProps> = (props) => {
  const classes = useStyles()

  const { sectionData } = props

  const [{ title }, setTitle] = useState(props)
  const [fields, setFields] = useState<Array<FieldFormFillerProps>>(
    sectionData.fields
  )

  useEffect(() => {
    const { sectionID: id } = props
    props.sendData({
      title,
      fields,
      sectionID: id,
      sections: [],
    })
  }, [fields])

  const getFieldState = (val: any): void => {
    const updatedFields: Array<FieldFormFillerProps> = [...fields]
    const updatedIndex = fields.findIndex(
      (field) => field.fieldID === val.fieldID
    )
    updatedFields[updatedIndex] = val
    setFields(updatedFields)
  }

  return (
    <div className={classes.root}>
      <Accordion elevation={3}>
        <AccordionSummary
          expandIcon={<AddCircleRoundedIcon data-cy='expandMore' />}
          aria-controls='panel1a-content'
          id='panel1a-header'
          className={classes.summary}
        >
          <Typography data-cy='section-response-title' variant='h5'>
            {title}
          </Typography>
        </AccordionSummary>
        <AccordionDetails className={classes.container}>
          {fields.map((field) => {
            return (
              <div className={classes.fieldRow}>
                <FieldFormFiller
                  sendData={getFieldState}
                  fieldID={field.fieldID}
                  editableStatus={props.editableStatus}
                  currTitle={field.currTitle}
                  currType={field.currType}
                  currResponse={field.currResponse}
                  currOptions={field.currOptions}
                />
              </div>
            )
          })}
        </AccordionDetails>
      </Accordion>
    </div>
  )
}

export default SectionResponse
