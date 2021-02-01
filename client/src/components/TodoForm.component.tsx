import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Button, makeStyles, TextField } from '@material-ui/core'
import { addTodo } from '../store/slices/TodoList.slice'

const useStyles = makeStyles(() => ({
  root: {},
}))

const TodoForm: React.FC = () => {
  const classes = useStyles()
  const dispatch = useDispatch()
  const [currentTodo, setCurrentTodo] = useState('')
  const [error, setError] = useState(false)

  const addTodoHandler: () => void = () => {
    if (currentTodo.length === 0) setError(true)
    else {
      dispatch(addTodo({ todo: { todo: currentTodo } }))
      setError(false)
      setCurrentTodo('')
    }
  }

  const onInputChange: (
    event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => void = (event) => {
    setCurrentTodo(event.target.value)
  }

  return (
    <form className={classes.root} noValidate autoComplete='off'>
      <div>
        <TextField
          data-cy='todoTextField'
          error={error}
          value={currentTodo}
          onChange={onInputChange}
          label='New Todo'
          helperText={
            error
              ? 'Please enter a valid todo'
              : 'Please enter something you would like to get done today.'
          }
        />
        <Button data-cy='addTodoButton' onClick={addTodoHandler}>
          ADD TODO
        </Button>
      </div>
    </form>
  )
}

export default TodoForm
