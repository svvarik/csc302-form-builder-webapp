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
  const { enabled, response, optionsData, readOnly } = props

  const [responseState, setResponse] = React.useState(response || '')
  const [answers, setAnswer] = React.useState<string[]>(
    optionsData && optionsData.length > 0 ? optionsData : ['']
  )

  const classes = useStyles()

  useEffect(() => {
    props.sendResponse({ response: responseState, options: answers })
  }, [responseState])

  const handleMCChange = (count: number) => (event: any) => {
    if (typeof optionsData === 'undefined') {
      if (responseState === answers[count]) {
        setResponse('')
        props.sendResponse({ response: responseState, options: answers })
      } else {
        setResponse(answers[count])
        props.sendResponse({ response: responseState, options: answers })
      }
    } else if (typeof optionsData !== 'undefined') {
      const optionsCopy = optionsData
      if (responseState === optionsData[count]) {
        setResponse('')
        props.sendResponse({ response: responseState, options: optionsCopy })
      } else {
        setResponse(optionsData[count])
        props.sendResponse({ response: responseState, options: optionsCopy })
      }
    }
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
    // Condition for read only mode
    if (readOnly) {
      return answers.map((ans: string) => {
        count += 1
        return (
          <FormControlLabel
            key={count}
            disabled
            value={ans}
            control={<Radio color='primary' data-cy={`mcRadio${count}`} />}
            label={
              <TextField
                data-cy={`mcTextField${count}`}
                disabled
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
    // Condition for form filler mode
    if (enabled) {
      return answers.map((ans: string) => {
        count += 1
        return (
          <FormControlLabel
            key={count}
            value={ans}
            onChange={handleMCChange(count)}
            control={<Radio color='primary' data-cy={`mcRadio${count}`} />}
            label={
              <TextField
                data-cy={`mcTextField${count}`}
                disabled
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
    // Condition for form creation
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

  if (enabled || readOnly) {
    return (
      <div>
        <FormControl className={classes.input}>
          <RadioGroup value={response} data-cy='mcRadioGroup'>
            {renderAnswers()}
          </RadioGroup>
        </FormControl>
      </div>
    )
  }
  return (
    <div>
      <FormControl className={classes.input}>
        <RadioGroup value={responseState} data-cy='mcRadioGroup'>
          {renderAnswers()}
        </RadioGroup>
      </FormControl>
      <Add prompt='Option' sendClick={newAnswer} />
    </div>
  )
}

export default MCInput
