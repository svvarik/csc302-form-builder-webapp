export type FieldFormFillerProps = {
  sendData: (val: any) => void
  fieldID: string
  editableStatus: boolean
  currTitle: string
  currType: string
  currResponse?: string | string[]
  currOptions?: Array<string>
}
