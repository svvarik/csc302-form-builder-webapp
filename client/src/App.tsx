import React from 'react'
import { Container, Box, Typography } from '@material-ui/core'
import SaveRequest from './requests'

import TodoForm from './components/TodoForm.component'
import TodoList from './components/TodoList.component'
import TextQuestionField from './components/TextQuestionField.component'

const App: React.FC = () => (
  <Container maxWidth='md'>
    <Box my={4}>
      <Typography data-cy='pageTitle' variant='h4' component='h1' gutterBottom>
        CSC302H Starter
      </Typography>
      <TextQuestionField
        question='Paste JSON Here'
        fieldID='s231asd'
        fieldLabel='please paste your JSON in this field'
      />
    </Box>
  </Container>
)

export default App
