import { Container, Grid, makeStyles, Typography } from '@material-ui/core'
import Button from '@material-ui/core/Button'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { GetFormTemplate, PublishForm, UpdateForm } from '../../requests'
import { ConfigureProps } from '../../types/Configure.type'
import FormTemplate from './FormTemplate.component'

const useStyles = makeStyles((theme) => ({
  title: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(2),
  },
  link: {
    textDecoration: 'none',
  },
}))

const Configure: React.FC<ConfigureProps> = (props) => {
  const [currentRequestJson, setCurrentRequestJson] = useState({})
  const [propsFormData, setPropsFormData] = useState({})

  const classes = useStyles()
  const { formID } = props

  useEffect(() => {
    const fetchData = async (id: string) => {
      const formBody = await (await GetFormTemplate(id)).json()
      setCurrentRequestJson(formBody)
      setPropsFormData(formBody)
    }
    if (formID) {
      fetchData(formID)
    }
  }, [])

  const onPublish: () => void = async () => {
    console.log(currentRequestJson)
    if (formID) {
      await UpdateForm(JSON.stringify(currentRequestJson), formID)
    } else {
      await PublishForm(JSON.stringify(currentRequestJson))
    }
  }

  const getFormState = (val: any): void => {
    // console.log(val)
    setCurrentRequestJson(val)
  }

  const renderEmptyFormTemplate = () => {
    return <FormTemplate sendForm={getFormState} />
  }

  const renderFilledFormTemplate = () => {
    return propsFormData && Object.keys(propsFormData).length > 0 ? (
      <FormTemplate sendForm={getFormState} formData={propsFormData} />
    ) : (
      <div> Loading </div>
    )
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
          {formID ? 'Edit Form' : 'Create a New Form'}
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} md={8}>
            {formID ? renderFilledFormTemplate() : renderEmptyFormTemplate()}
          </Grid>
        </Grid>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Link to='/' className={classes.link}>
              <Button
                data-cy='publishTemplateButton'
                variant='contained'
                color='primary'
                onClick={onPublish}
              >
                {formID ? 'Update Template' : 'Publish as Template'}
              </Button>
            </Link>
          </Grid>
        </Grid>
      </div>
    </Container>
  )
}

export default Configure
