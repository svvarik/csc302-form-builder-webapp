import React, { useEffect, useState } from 'react'
import { Grid, TextField, makeStyles, Typography } from '@material-ui/core'
import { FormResponseProps } from '../../types/FormResponse.type'
import { SectionInfo } from '../../types/SectionResponse.type'
import Section from '../FormTemplate/SectionTemplate.component'
import SectionResponse from './SectionResponse.component'

interface SectionResponseInfo {
  title: string
  sectionID: string
  sectionData: {
    title: string
    fields: any[]
  }
}

const useStyles = makeStyles((theme) => ({
  root: {},
  title: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(2),
  },
  row: {
    marginBottom: theme.spacing(4),
  },
}))

const FormResponse: React.FC<FormResponseProps> = (props) => {
  const classes = useStyles()

  const {
    formID,
    formTitle,
    formDesc,
    editableStatus,
    patientID,
    sections,
    procedureID,
  } = props

  const [formTitleState, setFormTitle] = useState('')
  const [formDescState, setFormDesc] = useState('')
  const [procedureIDState, setProcedureID] = useState('')

  const [patientIDState, setPatientID] = useState(patientID)
  const [sectionsState, setSections] = useState<Array<SectionInfo>>([])

  useEffect(() => {
    setFormTitle(formTitle)
    setFormDesc(formDesc)
    setProcedureID(procedureID)
  }, [formTitle, formDesc])

  useEffect(() => {
    sections.forEach(function (section) {
      section.fields.forEach(function (field) {
        field.currTitle = field.title
        field.currType = field.type
        // field.currResponse = field.response
        field.currOptions = field.options
      })
    })

    setSections(sections)
    console.log('sections after map fields', sections, sectionsState)
  }, [sections])

  useEffect(() => {
    props.sendForm({
      formID,
      title: formTitle,
      desc: formDesc,
      patientID: patientIDState,
      procedureID,
      sections: sectionsState,
    })
  }, [procedureIDState, sectionsState])

  const handlePatientIDChange = (event: { target: { value: any } }) => {
    setPatientID(event.target.value)
  }

  const getSectionState = (val: any): void => {
    const updatedSections: Array<SectionInfo> = [...sectionsState]
    const updatedIndex = sectionsState.findIndex(
      (section) => section.sectionID === val.sectionID
    )
    updatedSections[updatedIndex] = val
    setSections(updatedSections)
  }

  return (
    <div data-cy='formBox' className={classes.root}>
      <div className={classes.row}>
        <Typography
          data-cy='formTitle'
          variant='h3'
          component='h3'
          className={classes.title}
        >
          {formTitleState}
        </Typography>
        <Typography data-cy='formID' variant='body1' color='textSecondary'>
          Form {formID}
        </Typography>
        <Typography
          data-cy='formProcedure'
          variant='body1'
          color='textSecondary'
        >
          Procedure {procedureID}
        </Typography>
      </div>
      <div className={classes.row}>
        <Typography data-cy='formDesc' variant='body2' color='textSecondary'>
          {formDescState}
        </Typography>
      </div>
      <div className={classes.row}>
        <TextField
          id='standard-basic'
          label='Patient ID'
          data-cy='patientIDField'
          fullWidth
          inputProps={{ style: { fontSize: 24 } }}
          value={patientIDState}
          onChange={handlePatientIDChange}
        />
      </div>
      <div className={classes.row}>
        {sectionsState.map((section) => (
          <SectionResponse
            key={section.sectionID}
            title={section.title}
            sectionID={section.sectionID}
            editableStatus={editableStatus}
            sendData={getSectionState}
            sectionData={{ title: section.title, fields: section.fields }}
          />
        ))}
      </div>
    </div>
  )
}

export default FormResponse
