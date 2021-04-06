import React, { useState, useEffect } from 'react'
import { TextField, makeStyles } from '@material-ui/core'
import TextInput from '../questions/TextInput.component'
import NumInput from '../questions/NumInput.component'
import TFInput from '../questions/TFInput.component'
import MCInput from '../questions/MCInput.component'
import CBInput from '../questions/CBInput.component'
import { FieldFormFillerProps } from '../../types/FieldFormFiller.type'

const useStyles = makeStyles((theme) => ({
  centeredRow: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
  },
  fieldBox: {
    display: 'flex',
    flexDirection: 'column',
    border: '2px solid #828282',
    borderRadius: theme.spacing(2),
    padding: theme.spacing(2),
  },
  dropdown: {
    width: '20%',
    minWidth: '160px',
    marginTop: theme.spacing(1),
  },
  fieldTitle: {
    marginRight: theme.spacing(3),
  },
}))

const FieldFormFiller: React.FC<FieldFormFillerProps> = (props) => {
  const classes = useStyles()
  const {
    currTitle,
    currType,
    currResponse,
    editableStatus,
    currOptions,
  } = props
  const [jsonState, setJson] = useState({
    title: currTitle,
    type: currType,
    response: currResponse,
    options: currOptions,
  })

  const [responseState, setResponse] = useState(currResponse)

  useEffect(() => {
    const { fieldId: id } = props
    props.sendData({
      ...jsonState,
      fieldId: id,
    })
  }, [jsonState])

  const getInputState = (val: any) => {
    const hasOption = (json: { type: string }) => {
      return json.type === 'MC' || json.type === 'CB'
    }

    setJson((prevState) => {
      return {
        ...prevState,
        response: val.response,
        options: hasOption(jsonState) ? val.options : [''],
      }
    })
    setResponse(val.response)
  }

  const renderQuestion = () => {
    if (editableStatus === true) {
      // If we want to be able to select boxes but we have provided options
      if (typeof currOptions !== 'undefined') {
        switch (jsonState.type) {
          case 'TEXT':
            return (
              <TextInput
                enabled
                response={responseState}
                sendResponse={getInputState}
              />
            )
          case 'INT':
            return (
              <NumInput
                enabled
                response={responseState}
                sendResponse={getInputState}
              />
            )
          case 'MC':
            return (
              <MCInput
                enabled
                response={responseState}
                optionsData={currOptions}
                sendResponse={getInputState}
              />
            )
          case 'CB':
            return (
              <CBInput
                enabled
                response={responseState}
                optionsData={currOptions}
                sendResponse={getInputState}
              />
            )
          case 'TF':
            return (
              <TFInput
                enabled
                response={responseState}
                sendResponse={getInputState}
              />
            )
          default:
            return ''
        }
      }
      switch (jsonState.type) {
        case 'TEXT':
          return <TextInput enabled sendResponse={getInputState} />
        case 'INT':
          return <NumInput enabled sendResponse={getInputState} />
        case 'MC':
          return <MCInput enabled sendResponse={getInputState} />
        case 'CB':
          return <CBInput enabled sendResponse={getInputState} />
        case 'TF':
          return <TFInput enabled sendResponse={getInputState} />
        default:
          return ''
      }
    } else {
      // Using existing responses
      switch (jsonState.type) {
        case 'TEXT':
          return (
            <TextInput
              enabled={false}
              response={responseState}
              sendResponse={getInputState}
              readOnly
            />
          )
        case 'INT':
          return (
            <NumInput
              enabled={false}
              response={responseState}
              sendResponse={getInputState}
              readOnly
            />
          )
        case 'MC':
          return (
            <MCInput
              enabled={false}
              response={responseState}
              optionsData={currOptions}
              sendResponse={getInputState}
              readOnly
            />
          )
        case 'CB':
          return (
            <CBInput
              enabled={false}
              response={currResponse}
              optionsData={currOptions}
              sendResponse={getInputState}
              readOnly
            />
          )
        case 'TF':
          return (
            <TFInput
              enabled={false}
              response={responseState}
              sendResponse={getInputState}
              readOnly
            />
          )
        default:
          return ''
      }
    }
  }

  return (
    <div data-cy='fieldBox' className={classes.fieldBox}>
      <div className={classes.centeredRow}>
        <TextField disabled data-cy='titleTextField' value={currTitle} />
      </div>
      <div data-cy='fieldQuestion'>{renderQuestion()}</div>
    </div>
  )
}

export default FieldFormFiller
