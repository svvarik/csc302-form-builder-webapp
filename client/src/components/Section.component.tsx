import React from 'react'
import { SectionProps } from '../types/Section.type'
import Field from './Field.component'

const Section: React.FC<SectionProps> = () => {
  const getFieldState = (val: any): void => {
    // console.log(val)
  }

  return <Field sendData={getFieldState} />
}

export default Section
