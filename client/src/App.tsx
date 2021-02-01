import React from 'react'
import { Container, Box, Typography } from '@material-ui/core'

import TodoForm from './components/TodoForm.component'
import TodoList from './components/TodoList.component'

const App: React.FC = () => (
  <Container maxWidth='md'>
    <Box my={4}>
      <Typography data-cy='pageTitle' variant='h4' component='h1' gutterBottom>
        CSC302H Starter
      </Typography>
      <TodoForm />
      <TodoList />
    </Box>
  </Container>
)

export default App
