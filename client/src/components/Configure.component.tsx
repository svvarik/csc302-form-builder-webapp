import { Container, Grid, Typography } from '@material-ui/core'
import Button from '@material-ui/core/Button'
import React, { useState } from 'react'
import FormTemplate from './FormTemplate.component'
import { PublishRequest } from '../requests'

const Configure: React.FC = () => {
  const [currentRequestJson, setCurrentRequestJson] = useState('')

  // JSON will be set from the form component
  const onPublish: () => void = async () => {
    console.log(currentRequestJson)
    const req = await PublishRequest(JSON.stringify(currentRequestJson))

    // if (req && req.status === 200) {
    //   setCurrentRequestJson('')
    // }
  }

  const getFormState = (val: any): void => {
    setCurrentRequestJson(val)
  }

  return (
    <Container maxWidth='md'>
      <div>
        <br />
        <Typography data-cy='homepageTitle' variant='h3' component='h3'>
          Create a New Form
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <FormTemplate sendForm={getFormState} dateCreated={Date.now} />
          </Grid>
        </Grid>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Button variant='contained' color='primary' onClick={onPublish}>
              Publish as Template
            </Button>
          </Grid>
        </Grid>
      </div>
    </Container>
  )
}

export default Configure
