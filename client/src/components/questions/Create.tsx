import * as React from 'react'

export interface IValues {
  first_name: string
  last_name: string
  email: string
  phone: string
  address: string
  description: string
}
export interface IFormState {
  [key: string]: any
  values: IValues[]
  submitSuccess: boolean
  loading: boolean
}
