export type FieldFormFillerProps = {
  sendData: (val: any) => void
  fieldId: string
  editableStatus: boolean
  currTitle: string
  currType: string
  currResponse?: string | string[]
  currOptions?: Array<string>
}
