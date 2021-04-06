import { Container, Grid, makeStyles, Button } from '@material-ui/core'
import { RouteComponentProps, useParams, Link } from 'react-router-dom'
import React, { useState, useEffect } from 'react'
import FormResponse from './FormResponse.component'
import { GetFormResponse, UpdateFormResponse } from '../../requests'
import { SectionInfo } from '../../types/SectionResponse.type'

interface ParamTypes {
  id: string
}

const useStyles = makeStyles((theme) => ({
  title: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(2),
  },
  link: {
    textDecoration: 'none',
  },
}))

const ConfigureFormResponseView: React.FC<RouteComponentProps> = () => {
  const [currentRequestJson, setCurrentRequestJson] = useState('')
  const classes = useStyles()

  const getFormState = (val: any): void => {
    setCurrentRequestJson(val)
  }

  const { id } = useParams<ParamTypes>()

  const [formTitle, setFormTitle] = useState('')
  const [formDesc, setFormDesc] = useState('')
  const [sectionsState, setSections] = useState<Array<SectionInfo>>([])
  const [procedureID, setProcedureID] = useState('')
  const [patientID, setPatientID] = useState('')

  const onLoad: () => any = async () => {
    try {
      const req = await GetFormResponse(id)
      const json = await req.json()
      console.log('req', req)
      console.log('json', json)
      setFormTitle(json.title)
      setFormDesc(json.desc)
      setSections(json.sections)
      setProcedureID(
        json.procedureID ? json.procedureID : '(no assigned procedure)'
      )
      setPatientID(json.patientID ? json.patientID : '')
      return json
    } catch (err) {
      console.error(err)
      throw err
    }
  }

  const onSave: () => void = async () => {
    alert('Response updated')
    console.log(currentRequestJson)
    const req = await UpdateFormResponse(JSON.stringify(currentRequestJson), id)
    console.log(req)
  }

  useEffect(() => {
    onLoad()
  }, [id])

  return (
    <Container maxWidth='md'>
      <div>
        <Grid container spacing={3}>
          <Grid item xs={12} md={8}>
            <FormResponse
              formID={id}
              formTitle={formTitle}
              formDesc={formDesc}
              procedureID={procedureID}
              patientID={patientID}
              sections={sectionsState}
              editableStatus={false}
              sendForm={getFormState}
            />
          </Grid>
        </Grid>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Button
              data-cy='updateResponseButton'
              variant='contained'
              color='primary'
              onClick={onSave}
            >
              Update Response
            </Button>
          </Grid>
        </Grid>
      </div>
    </Container>
  )
}

export default ConfigureFormResponseView
