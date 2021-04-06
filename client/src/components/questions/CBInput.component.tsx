import {
  FormControl,
  FormControlLabel,
  TextField,
  makeStyles,
  Checkbox,
} from '@material-ui/core'
import React, { useEffect } from 'react'
import { MCInputProps } from '../../types/Field.type'
import Add from '../Add.component'

const useStyles = makeStyles((theme) => ({
  input: {
    marginTop: theme.spacing(1),
  },
}))

const CBInput: React.FC<MCInputProps> = (props) => {
  const { enabled, response, optionsData, readOnly } = props

  const [answers, setAnswer] = React.useState<string[]>(optionsData || [''])
  const [responseState, setResponse] = React.useState<string[]>([])
  const classes = useStyles()

  useEffect(() => {
    props.sendResponse({ response: responseState, options: answers })
  }, [responseState])

  const handleCBChange = (count: number) => (event: any) => {
    if (typeof optionsData === 'undefined') {
      if (responseState.includes(answers[count])) {
        const responseCopy = responseState.filter(
          (res) => res !== answers[count]
        )
        setResponse(responseCopy)
        props.sendResponse({ response: responseCopy, options: answers })
      } else {
        const responseCopy = responseState.concat(answers[count])
        setResponse(responseCopy)
        props.sendResponse({ response: responseCopy, options: answers })
      }
    } else if (typeof optionsData !== 'undefined') {
      const optionsCopy = optionsData
      if (responseState.includes(optionsData[count])) {
        const responseCopy = responseState.filter(
          (res) => res !== optionsData[count]
        )
        setResponse(responseCopy)
        props.sendResponse({ response: responseCopy, options: optionsCopy })
      } else {
        const responseCopy = responseState.concat(optionsData[count])
        setResponse(responseCopy)
        props.sendResponse({ response: responseCopy, options: optionsCopy })
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
    if (
      readOnly &&
      typeof response !== 'undefined' &&
      typeof response !== 'number'
    ) {
      return answers.map((ans: string) => {
        count += 1
        return (
          <FormControlLabel
            key={count}
            disabled
            value={ans}
            onChange={handleCBChange(count)}
            control={
              <Checkbox
                checked={response.includes(ans)}
                color='primary'
                data-cy={`checkbox${count}`}
              />
            }
            label={
              <TextField
                disabled
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

    // Condition for form filler mode
    if (enabled) {
      return answers.map((ans: string) => {
        count += 1
        return (
          <FormControlLabel
            key={count}
            value={ans}
            onChange={handleCBChange(count)}
            control={
              <Checkbox
                checked={responseState.includes(ans)}
                color='primary'
                data-cy={`checkbox${count}`}
              />
            }
            label={
              <TextField
                disabled
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
    // Condition for form creation
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

  if (enabled || readOnly) {
    return (
      <div>
        <FormControl className={classes.input} data-cy='cbGroup'>
          {renderAnswers()}
        </FormControl>
      </div>
    )
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
