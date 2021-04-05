import React, { useEffect, useState } from 'react'
import { TextField, Button, makeStyles } from '@material-ui/core'
import { v4 as uuidv4 } from 'uuid' // eslint-disable-line import/no-extraneous-dependencies
import { FormTemplateProps } from '../../types/FormTemplate.type'
import SectionTemplate from './SectionTemplate.component'
import Add from '../Add.component'
import { SectionInfo } from '../../types/Section.type'

const useStyles = makeStyles((theme) => ({
  addButton: {
    marginTop: '2em',
  },
  row: {
    marginBottom: theme.spacing(4),
  },
}))

const FormTemplate: React.FC<FormTemplateProps> = (props) => {
  const classes = useStyles()
  const { formData } = props

  const [formTitle, setTitle] = useState(
    formData && formData.title ? formData.title : ''
  )
  const [formDescription, setDescription] = useState(
    formData && formData.desc ? formData.desc : ''
  )
  const [sectionsState, setSections] = useState<Array<SectionInfo>>(
    formData && formData.sections ? formData.sections : []
  )

  // alert('title')

  useEffect(() => {
    props.sendForm({
      title: formTitle,
      desc: formDescription,
      sections: sectionsState,
    })
  }, [formTitle, formDescription, sectionsState])

  const handleTitleChange = (event: { target: { value: any } }) => {
    setTitle(event.target.value)
  }

  const handleDescriptionChange = (event: { target: { value: any } }) => {
    setDescription(event.target.value)
  }

  const addSection = () => {
    setSections([
      ...sectionsState,
      { title: '', fields: [], sectionID: uuidv4() },
    ])
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
    <div>
      <div className={classes.row}>
        <TextField
          id='standard-basic'
          label='Form Template Title'
          data-cy='templateTitle'
          inputProps={{ style: { fontSize: 48, fontWeight: 'lighter' } }}
          fullWidth
          value={formTitle}
          onChange={handleTitleChange}
        />
      </div>
      <div className={classes.row}>
        <TextField
          id='standard-basic'
          label='Form Template Description'
          data-cy='templateDescription'
          fullWidth
          value={formDescription}
          inputProps={{ style: { fontSize: 24 } }}
          onChange={handleDescriptionChange}
        />
      </div>
      <div className={classes.row}>
        {sectionsState.map((section) => (
          <SectionTemplate
            key={section.sectionID}
            title={section.title}
            sectionID={section.sectionID}
            sendData={getSectionState}
            sectionData={section}
          />
        ))}
      </div>
      <Add sendClick={addSection} prompt='Section' />
    </div>
  )
}

export default FormTemplate
