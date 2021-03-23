import { Container, Grid, makeStyles, Typography } from '@material-ui/core'
import Button from '@material-ui/core/Button'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import FormTemplate from './FormTemplate.component'
import { PublishRequest } from '../requests'

const useStyles = makeStyles((theme) => ({
  title: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(2),
  },
  link: {
    textDecoration: 'none',
  },
}))

const Configure: React.FC = () => {
  const [currentRequestJson, setCurrentRequestJson] = useState('')
  const classes = useStyles()

  const onPublish: () => void = async () => {
    console.log(currentRequestJson)
    const req = await PublishRequest(JSON.stringify(currentRequestJson))
  }

  const getFormState = (val: any): void => {
    setCurrentRequestJson(val)
  }

  return (
    <Container maxWidth='md'>
      <div>
        <Typography
          data-cy='homepageTitle'
          variant='h3'
          component='h3'
          className={classes.title}
        >
          Create a New Form
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} md={8}>
            <FormTemplate sendForm={getFormState} dateCreated={Date.now} />
          </Grid>
        </Grid>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Link to='/' className={classes.link}>
              <Button variant='contained' color='primary' onClick={onPublish}>
                Publish as Template
              </Button>
            </Link>
          </Grid>
        </Grid>
      </div>
    </Container>
  )
}

export default Configure
