import AddIcon from '@material-ui/icons/Add'
import { Fab, makeStyles } from '@material-ui/core'
import React from 'react'
import { AddProps } from '../types/Add.type'

const useStyles = makeStyles((theme) => ({
  promptText: {
    marginLeft: theme.spacing(2),
  },
  leftRow: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: theme.spacing(1),
  },
}))

const Add: React.FC<AddProps> = ({ prompt, sendClick }) => {
  const classes = useStyles()

  return (
    <div className={classes.leftRow}>
      <Fab
        size='small'
        color='default'
        onClick={() => sendClick()}
        data-cy='addButton'
      >
        <AddIcon />
      </Fab>
      <div className={classes.promptText} data-cy='addPrompt'>
        Add {prompt}
      </div>
    </div>
  )
}

export default Add
