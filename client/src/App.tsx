import React from 'react'
import { Container, Box, Typography } from '@material-ui/core'
<<<<<<< HEAD
import Homepage from './components/Homepage.component'
import FormTemplate from './components/FormTemplate.component'
=======

import TextQuestionField from './components/TextQuestionField.component'
import Section from './components/Section.component'
import Configure from './components/Configure.component'
>>>>>>> Initial configure. Kind of empty because missing the actual form. Assumption is that a JSON will be passed from the form and can be fed to publish request

const App: React.FC = () => (
  <Container maxWidth='md'>
    <Box my={4}>
<<<<<<< HEAD
      <FormTemplate sendForm={(_) => {}} dateCreated={Date.now} />
    </Box>
    <Box my={4}>
      <Homepage />
=======
      <Typography data-cy='pageTitle' variant='h4' component='h1' gutterBottom>
        CSC302H Starter
      </Typography>
      <Section title='Section 1' />
      <Configure />
>>>>>>> Initial configure. Kind of empty because missing the actual form. Assumption is that a JSON will be passed from the form and can be fed to publish request
    </Box>
  </Container>
)

export default App
