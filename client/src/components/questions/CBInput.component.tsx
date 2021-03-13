import {
  FormControl,
  FormControlLabel,
  TextField,
  makeStyles,
  Checkbox,
} from '@material-ui/core'
import React from 'react'
import { MCInputProps } from '../../types/Field.type'
import Add from '../Add.component'

const useStyles = makeStyles((theme) => ({
  input: {
    marginTop: theme.spacing(1),
  },
}))

const CBInput: React.FC<MCInputProps> = (props) => {
  const [responseState, setResponse] = React.useState('')
  const [answers, setAnswer] = React.useState<string[]>([''])
  const classes = useStyles()

  const handleCBChange = (count: number) => (event: any) => {
    props.sendResponse({ response: responseState, options: answers })
    // TODO implement with form response
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
          onChange={handleCBChange(count)}
          control={<Checkbox data-cy={`checkbox${count}`} />}
          label={
            <TextField
              data-cy={`cbTextField${count}`}
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
      <FormControl className={classes.input} data-cy='cbGroup'>
        {renderAnswers()}
      </FormControl>
      <Add prompt='Option' sendClick={newAnswer} />
    </div>
  )
}

export default CBInput
