import React from 'react'
import { Container, Box, Typography } from '@material-ui/core'

import TextQuestionField from './components/TextQuestionField.component'
import Section from './components/Section.component'

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
      <Section title='Section 1' />
    </Box>
  </Container>
)

export default App
