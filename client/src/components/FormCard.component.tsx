import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  Button,
  Typography,
  Card,
  CardContent,
  CardActions,
  makeStyles,
  Table,
  TableBody,
  TableRow,
  TableCell,
  IconButton,
  Grid,
  Box,
} from '@material-ui/core'
import { Link } from 'react-router-dom'
import { HighlightOff, AccountCircle } from '@material-ui/icons'
import { FormConfig } from '../types/FormConfig.type'
import { removeFromFormListThunk } from '../store/slices/FormList.slice'
import { selectAuth } from '../store/store'
import { getProcedureById } from '../requests'

type FormConfigProps = FormConfig

const useStyles = makeStyles((theme) => ({
  root: {
    width: 350,
    height: 350,
    margin: theme.spacing(1),
    position: 'relative',
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  description: {
    fontWeight: 'lighter',
  },
  pos: {
    marginBottom: theme.spacing(1),
  },
  descriptionBox: {
    maxHeight: 60,
    maxWidth: '100%',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    display: '-webkit-box',
    WebkitLineClamp: 3,
    WebkitBoxOrient: 'vertical',
  },
  infoTable: {
    bottom: 75,
  },
  table: {
    marginTop: theme.spacing(1),
    position: 'absolute',
    bottom: 75,
  },
  tableCell: {
    fontSize: 12,
    padding: theme.spacing(0.5),
  },
  bottomRow: {
    borderBottom: 'none',
    color: theme.palette.text.secondary,
  },
  buttonsBar: {
    position: 'absolute',
    bottom: 0,
    marginRight: theme.spacing(1),
  },
  deleteButton: {
    padding: 0,
    display: 'flex',
    justifyContent: 'flex-end',
  },
  userInfo: {
    marginTop: 1,
    position: 'absolute',
    bottom: 150,
  },
  deleteButtonContainer: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
}))

const FormCard: React.FC<FormConfigProps> = ({
  formID,
  formTitle,
  description,
  dateCreated,
  dateModified,
  procedure,
  username,
}) => {
  const classes = useStyles()
  const dispatch = useDispatch()
  const { user } = useSelector(selectAuth)
  const [procedureName, setProcedureName] = useState('')

  useEffect(() => {
    const fetchTitle = async () => {
      if (procedure) {
        const fetchedProcedure = await (
          await getProcedureById(procedure)
        ).json()
        console.log(procedure)
        if (fetchedProcedure) {
          setProcedureName(fetchedProcedure.procedure)
        }
      }
    }
    fetchTitle()
  }, [procedureName])

  const deleteCardHandler: () => void = () => {
    dispatch(removeFromFormListThunk(formID))
  }

  return (
    <div id={formID} data-cy='formCard'>
      <Card className={classes.root} variant='outlined'>
        <CardContent>
          <Grid container>
            <Grid item xs={10}>
              <Typography variant='h5' component='h2'>
                {formTitle}
              </Typography>
            </Grid>
            <Grid item xs={2} className={classes.deleteButtonContainer}>
              {user === 'DATA_ADMIN' && (
                <IconButton
                  aria-label='delete'
                  data-cy='deleteFormCardButton'
                  className={classes.deleteButton}
                  onClick={deleteCardHandler}
                >
                  <HighlightOff />
                </IconButton>
              )}
            </Grid>
          </Grid>
          <Typography
            variant='body1'
            className={classes.pos}
            color='textSecondary'
          >
            Form #{formID}
          </Typography>

          <Typography
            variant='body2'
            component='p'
            color='textSecondary'
            className={[classes.description, classes.descriptionBox].join(' ')}
          >
            {description}
          </Typography>

          <Grid container spacing={2} className={classes.userInfo}>
            <Grid item xs={2}>
              <AccountCircle fontSize='large' />
            </Grid>
            <Grid item xs={10}>
              <Typography
                variant='body2'
                component='p'
                className={classes.description}
                color='textSecondary'
                display='block'
              >
                Created by
                <br />
                <Box fontWeight='fontWeightBold' color='text.primary'>
                  {username}
                </Box>
              </Typography>
            </Grid>
          </Grid>
          <Table
            className={[classes.table, classes.infoTable].join(' ')}
            aria-label='simple table'
          >
            <TableBody>
              <TableRow>
                <TableCell className={classes.tableCell}>
                  {dateCreated}
                </TableCell>
                <TableCell className={classes.tableCell}>
                  {dateModified}
                </TableCell>
                <TableCell className={classes.tableCell}>
                  {procedureName}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell
                  className={[classes.tableCell, classes.bottomRow].join(' ')}
                >
                  Created
                </TableCell>
                <TableCell
                  className={[classes.tableCell, classes.bottomRow].join(' ')}
                >
                  Last Modified
                </TableCell>
                <TableCell
                  className={[classes.tableCell, classes.bottomRow].join(' ')}
                >
                  Procedure
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>
        <Grid container justify='flex-end'>
          <CardActions className={classes.buttonsBar} data-cy='formCardAction'>
            <Link
              to={
                user === 'DATA_ADMIN'
                  ? `/configure-form/${formID}`
                  : `/fill-in-form/${formID}?editable=true`
              }
            >
              <Button
                variant='outlined'
                color='primary'
                data-cy='EditFormCardButton'
              >
                {user === 'DATA_ADMIN' ? 'EDIT' : 'FILL IN'}
              </Button>
            </Link>
          </CardActions>
        </Grid>
      </Card>
    </div>
  )
}

export default FormCard
