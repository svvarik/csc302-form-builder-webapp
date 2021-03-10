import {
  FormControl,
  RadioGroup,
  FormControlLabel,
  Radio,
  TextField,
  makeStyles,
} from '@material-ui/core'
import React, { useEffect } from 'react'
import { MCInputProps } from '../../types/Field.type'
import Add from '../Add.component'

const useStyles = makeStyles((theme) => ({
  input: {
    marginTop: theme.spacing(1),
  },
}))

const MCInput: React.FC<MCInputProps> = (props) => {
  const [responseState, setResponse] = React.useState('')
  const [answers, setAnswer] = React.useState<string[]>([''])
  const classes = useStyles()

  const handleMCChange = (event: { target: { value: any } }) => {
    setResponse(event.target.value)
    props.sendResponse({ response: responseState, options: answers })
  }

  const newAnswer = () => {
    const ans = [...answers, '']
    props.sendResponse({ response: responseState, options: ans })
    setAnswer(ans)
  }

  const handleOptionChange = (count: number) => (
    event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    const ans = [...answers]
    ans[count] = event.target.value
    props.sendResponse({ response: responseState, options: ans })
    setAnswer(ans)
  }

  const renderAnswers = (): any => {
    let count = -1
    return answers.map((ans: string) => {
      count += 1
      return (
        <FormControlLabel
          key={count}
          disabled
          control={<Radio data-cy={`mcRadio${count}`} />}
          label={
            <TextField
              data-cy={`mcTextField${count}`}
              value={ans}
              color='primary'
              placeholder='option'
              onChange={handleOptionChange(count)}
            />
          }
        />
      )
    })
  }

  return (
    <div>
      <FormControl className={classes.input}>
        <RadioGroup
          value={responseState}
          onChange={handleMCChange}
          data-cy='mcRadioGroup'
        >
          {renderAnswers()}
        </RadioGroup>
      </FormControl>
      <Add prompt='Option' sendClick={newAnswer} />
    </div>
  )
}

export default MCInput
