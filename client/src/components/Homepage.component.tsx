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

import FormList from './FormList.component'

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

const Homepage: React.FC = () => {
  const classes = useStyles()

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
              <Link to='/configure-new-form' className={classes.link}>
                <Button
                  data-cy='newFormButton'
                  className={classes.newButton}
                  variant='contained'
                  color='primary'
                >
                  New Form
                </Button>
              </Link>
            </Grid>
          </Grid>
        </Box>
        <Box my={4}>
          <Typography variant='h5' component='h5' color='textSecondary'>
            Forms
          </Typography>
          <FormList />
        </Box>
      </div>
    </Container>
  )
}

export default Homepage
