import React from 'react'
import { useDispatch } from 'react-redux'
import { Card, IconButton, makeStyles, Typography } from '@material-ui/core'
import DeleteIcon from '@material-ui/icons/Delete'
import { Todo } from '../types/Todo.type'
import { removeTodo } from '../store/slices/TodoList.slice'

const useStyles = makeStyles(() => ({
  root: {
    display: 'flex',
    justifyContent: 'space-between',
  },
}))

type TodoCardProps = Todo

const TodoCard: React.FC<TodoCardProps> = ({ todo }) => {
  const classes = useStyles()
  const dispatch = useDispatch()

  const removeTodoHandler: () => void = () => {
    dispatch(removeTodo(todo))
  }

  return (
    <Card data-cy='todoCard' className={classes.root}>
      <Typography data-cy='todoText'>{todo}</Typography>
      <IconButton
        data-cy='deleteTodoButton'
        aria-label='delete'
        onClick={removeTodoHandler}
      >
        <DeleteIcon fontSize='small' />
      </IconButton>
    </Card>
  )
}

export default TodoCard
