import React from 'react'
import { Container, Box, Typography } from '@material-ui/core'
import Homepage from './components/Homepage.component'
import FormTemplate from './components/FormTemplate.component'
import Section from './components/Section.component'

const App: React.FC = () => (
  <Container maxWidth='md'>
    <Box my={4}>
      <FormTemplate sendForm={(_) => {}} dateCreated={Date.now} />
    </Box>
    <Box my={4}>
      <Homepage />
    </Box>
    <Box my={4}>
      <Homepage />
    </Box>
  </Container>
)

export default App