export type FieldProps = {
  sendData: (val: any) => void
  fieldID: string
  fieldData?: FieldInfo
}

export type BaseInputProps = {
  sendResponse: (val: any) => void
  response?: string | string[] | number
  enabled: boolean
  readOnly?: boolean
}

export interface MCInputProps extends BaseInputProps {
  optionsData?: string[]
}

export interface FieldInfo {
  title: string
  type: string
  response: string
  options: Array<string>
  fieldID: string
}
