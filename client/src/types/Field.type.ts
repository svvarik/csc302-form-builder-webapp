export type FieldProps = {
  sendData: (val: any) => void
  fieldId: string
}

export type BaseInputProps = {
  sendResponse: (val: any) => void
  response?: string | string[] | number
  enabled: boolean
}

export interface MCInputProps extends BaseInputProps {
  options?: string[]
}
