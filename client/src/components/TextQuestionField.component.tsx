import React, { useState } from 'react'
import { Button, TextField, makeStyles, Typography } from '@material-ui/core'
import { TextQuestion } from '../types/TextQuestion.type'
import { SaveRequest } from '../requests'

type TextQuestionProps = TextQuestion

const useStyles = makeStyles(() => ({
  root: {
    display: 'flex',
  },
  input: {
    display: 'flex',
  },
}))

const TextQuestionField: React.FC<TextQuestionProps> = ({
  question,
  fieldID,
  fieldLabel,
}) => {
  const [currentQuestion, setCurrentQuestion] = useState('')
  const [error, setError] = useState(false)
  const classes = useStyles()
  const onInputChange: (
    event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => void = (event) => {
    setCurrentQuestion(event.target.value)
  }

  const onSubmit: () => void = async () => {
    if (currentQuestion.length === 0) setError(true)
    else {
      const req = await SaveRequest(currentQuestion)
      if (req && req.status === 200) {
        setError(false)
        setCurrentQuestion('')
      }
    }
  }

  return (
    <div id={fieldID} className={classes.root}>
      <Typography component='h4' gutterBottom>
        {question}
      </Typography>
      <TextField
        className={classes.input}
        variant='standard'
        label={fieldLabel}
        multiline
        rows={1}
        rowsMax={Infinity}
        onChange={onInputChange}
        style={{ width: '50%' }}
        error={error}
        value={currentQuestion}
      />
      <Button variant='contained' onClick={() => onSubmit()}>
        Submit
      </Button>
    </div>
  )
}

export default TextQuestionField
