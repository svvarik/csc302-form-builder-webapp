import AddIcon from '@material-ui/icons/Add'
import { Button, Fab, makeStyles } from '@material-ui/core'
import React from 'react'
import { AddProps } from '../types/Add.type'

const useStyles = makeStyles((theme) => ({
  promptText: {
    marginLeft: theme.spacing(2),
  },
  addButton: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: theme.spacing(1),
  },
}))

const Add: React.FC<AddProps> = ({ prompt, sendClick }) => {
  const classes = useStyles()

  return (
    <Button
      className={classes.addButton}
      color='primary'
      data-cy='addButton'
      onClick={() => sendClick()}
    >
      + Add {prompt}
    </Button>
  )
}

export default Add
