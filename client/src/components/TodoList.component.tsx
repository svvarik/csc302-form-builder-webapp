import React from 'react'
import { useSelector } from 'react-redux'
import { makeStyles } from '@material-ui/core'
import { selectTodoList } from '../store/store'
import TodoCard from './TodoCard.component'

const useStyles = makeStyles(() => ({
  root: {},
}))

const TodoList: React.FC = () => {
  const classes = useStyles()
  const { todos } = useSelector(selectTodoList)
  return (
    <div className={classes.root}>
      {todos.map((todo, i) => (
        <TodoCard todo={todo.todo} key={todo.todo + i.toString()} />
      ))}
    </div>
  )
}

export default TodoList
