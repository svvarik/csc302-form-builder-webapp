import React from 'react'
import {
  Grid,
  Box,
  Typography,
  makeStyles,
  Button,
  Container,
} from '@material-ui/core'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import FormList from './FormList.component'
import { selectAuth } from '../store/store'
import { fetchAllFormResponsesThunk } from '../store/slices/FormList.slice'

const useStyles = makeStyles((theme) => ({
  cardBox: {
    display: 'flex',
  },
  newButton: {
    marginTop: theme.spacing(0.5),
  },
  link: {
    textDecoration: 'none',
  },
}))

type HomepageProps = {
  isPatientList?: boolean
}

const Homepage: React.FC<HomepageProps> = ({ isPatientList }) => {
  const classes = useStyles()
  const dispatch = useDispatch()
  const { user } = useSelector(selectAuth)

  return (
    <Container maxWidth='md'>
      <div data-cy='homepageBox'>
        <Box my={4}>
          <Grid container spacing={1}>
            <Grid container item xs={6} spacing={3}>
              <Typography data-cy='homepageTitle' variant='h3' component='h3'>
                Dashboard
              </Typography>
            </Grid>
            <Grid container item xs={6} spacing={3} justify='flex-end'>
              <Link
                to={
                  // eslint-disable-next-line no-nested-ternary
                  user === 'DATA_ADMIN'
                    ? '/configure-form'
                    : isPatientList
                    ? '/'
                    : '/patient-forms'
                }
                className={classes.link}
              >
                <Button
                  data-cy='newFormButton'
                  className={classes.newButton}
                  variant='contained'
                  color='primary'
                  onClick={() => {
                    if (user !== 'DATA_ADMIN') {
                      dispatch(fetchAllFormResponsesThunk())
                    }
                  }}
                >
                  {
                    // eslint-disable-next-line no-nested-ternary
                    user === 'DATA_ADMIN'
                      ? 'New Form'
                      : isPatientList
                      ? 'Procedure Forms '
                      : 'View Patients'
                  }
                </Button>
              </Link>
            </Grid>
          </Grid>
        </Box>
        <Box my={4}>
          <Typography variant='h5' component='h5' color='textSecondary'>
            {isPatientList ? 'Patient Forms' : 'Procedure Forms'}
          </Typography>
          <FormList isPatientList={isPatientList} />
        </Box>
      </div>
    </Container>
  )
}

export default Homepage
