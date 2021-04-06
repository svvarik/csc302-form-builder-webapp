import {
  Container,
  Grid,
  makeStyles,
  Button,
  Typography,
  Link,
} from '@material-ui/core'
import { RouteComponentProps, useParams, useLocation } from 'react-router-dom'
import React, { useState, useEffect } from 'react'
import FormResponse from './FormResponse.component'
import {
  GetFormResponse,
  GetFormTemplate,
  SaveFormResponse,
} from '../../requests'
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

const ConfigureFormResponse: React.FC<RouteComponentProps> = () => {
  const [currentRequestJson, setCurrentRequestJson] = useState('')
  const location = useLocation()
  const { search } = location
  const classes = useStyles()
  const getFormState = (val: any): void => {
    setCurrentRequestJson(val)
  }

  const { id } = useParams<ParamTypes>()

  const [formTitle, setFormTitle] = useState('')
  const [formDesc, setFormDesc] = useState('')
  const [sectionsState, setSections] = useState<Array<SectionInfo>>([])
  const [procedureID, setProcedureID] = useState('')
  const [editableStatus, setEditableStatus] = useState(false)

  const onLoad: () => any = async () => {
    try {
      let req
      // alert(search)
      if (search.length > 0) {
        req = await GetFormTemplate(id)
      } else {
        req = await GetFormResponse(id)
      }
      const json = await req.json()
      console.log('req', req)
      console.log('json', json)
      setFormTitle(json.title)
      setFormDesc(json.desc)
      setSections(json.sections)
      setProcedureID(
        json.procedureID ? json.procedureID : '(no assigned procedure)'
      )
      return json
    } catch (err) {
      console.error(err)
      throw err
    }
  }

  const onSave: () => void = async () => {
    alert('Response saved')
    console.log(currentRequestJson)
    const req = await SaveFormResponse(JSON.stringify(currentRequestJson))
    console.log(req)
  }

  useEffect(() => {
    // let mounted = true
    onLoad()
    /* .then((res: any) => {
      try {
        if (mounted) {
          if (res) {
            console.log('res', res)
            setFormTitle(res.title)
            setFormDesc(res.desc)
            setSections(res.sections)
          }
        }
      } catch (err) {
        console.error(err)
        throw err
      }
    })

    return () => {
      mounted = false
    } */
  }, [id])

  useEffect(() => {
    if (search.length > 0) {
      setEditableStatus(true)
    } else {
      setEditableStatus(false)
    }
  }, [search])

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
              sections={sectionsState}
              editableStatus={editableStatus}
              sendForm={getFormState}
            />
          </Grid>
        </Grid>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Button
              data-cy='saveResponseButton'
              variant='contained'
              color='primary'
              onClick={onSave}
            >
              Save Response
            </Button>
          </Grid>
        </Grid>
      </div>
    </Container>
  )
}

export default ConfigureFormResponse
