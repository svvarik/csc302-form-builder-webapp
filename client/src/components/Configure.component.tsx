import { Grid } from '@material-ui/core'
import Button from '@material-ui/core/Button'
import React, { useState } from 'react'
import FormTemplate from './FormTemplate.component'
import { PublishRequest } from '../requests'

// There is no form component right now. I'm just going to make the publish button work.
const Configure: React.FC = () => {
  const [currentRequestJson, setCurrentRequestJson] = useState('')

  // JSON will be set from the form component
  const onPublish: () => void = async () => {
    // const req = await PublishRequest(JSON.stringify(currentRequestJson))
    const payload = {
      name: 'COVID FORM',
      formID: 'a',
      sections: [
        {
          name: 'Blood Tests',
          sectionID: '1',
          sections: [],
          fields: [
            {
              text: 'Blood Level',
              response: '50',
              type: 'integer',
              fieldID: 'a1a',
            },
            {
              text: 'Blood Type',
              response: 'AB',
              type: 'Multiple',
              fieldID: 'a1b',
            },
          ],
        },
      ],
    }
    const req = await PublishRequest(JSON.stringify(payload))

    if (req && req.status === 200) {
      setCurrentRequestJson('')
    }
  }

  const getFormState = (val: any): void => {
    setCurrentRequestJson(val)
    console.log(currentRequestJson)
  }

  return (
    <div>
      <br />
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <FormTemplate sendForm={getFormState} dateCreated={Date.now} />
        </Grid>
        <Grid item xs={12} md={6}>
          <Button variant='contained' color='primary' onClick={onPublish}>
            Publish as Template
          </Button>
        </Grid>
      </Grid>
    </div>
  )
}

export default Configure
