import React, { useState, useEffect } from 'react'
import { TextField, Button } from '@material-ui/core'
import { v4 as uuidv4 } from 'uuid'
import { FormTemplateProps } from '../types/FormTemplate.type'
import Section from './Section.component'

interface SectionInfo {
  title: string
  fields: Array<any>
  sectionId: string
}

const FormTemplate: React.FC<FormTemplateProps> = (props) => {
  const [formTitle, setTitle] = useState()
  const [sections, setSections] = useState<Array<SectionInfo>>([])

  const handleTitleChange = (event: { target: { value: any } }) => {
    setTitle(event.target.value)
  }

  const addSection = () => {
    setSections([...sections, { title: '', fields: [], sectionId: uuidv4() }])
  }

  return (
    <div>
      <div>
        <TextField
          id='standard-basic'
          label='Form Template Title'
          inputProps={{ style: { fontSize: 48, fontWeight: 'lighter' } }}
          fullWidth
          onChange={handleTitleChange}
        />
      </div>
      <div>
        <TextField
          id='standard-basic'
          label='Form Template Description'
          fullWidth
          inputProps={{ style: { fontSize: 24 } }}
          onChange={handleTitleChange}
        />
      </div>
      <div>
        {sections.map((section) => (
          <Section title={section.title} sectionId={section.sectionId} />
        ))}
      </div>
      <Button color='primary' onClick={addSection}>
        + Add Section
      </Button>
    </div>
  )
}

export default FormTemplate
