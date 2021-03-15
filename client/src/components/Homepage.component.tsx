import React from 'react'
import {
  Grid,
  Box,
  Typography,
  makeStyles,
  Button,
  GridList,
  GridListTile,
} from '@material-ui/core'

import FormCard from './FormCard.component'
import FormList from './FormList.component'

const useStyles = makeStyles((theme) => ({
  cardBox: {
    display: 'flex',
  },
  newButton: {
    marginTop: theme.spacing(0.5),
  },
}))

const Homepage: React.FC = () => {
  const classes = useStyles()

  return (
    <div data-cy='homepageBox'>
      <Grid container spacing={1}>
        <Grid container item xs={6} spacing={3}>
          <Typography data-cy='homepageTitle' variant='h3' component='h3'>
            Dashboard
          </Typography>
        </Grid>
        <Grid container item xs={6} spacing={3} justify='flex-end'>
          <Button
            className={classes.newButton}
            variant='contained'
            color='primary'
          >
            New Form
          </Button>
        </Grid>
      </Grid>

      <Box my={4}>
        <Typography variant='h5' component='h5' color='textSecondary'>
          Forms
        </Typography>
        <FormList />
      </Box>
    </div>
  )
}

export default Homepage
