import { FieldFormFillerProps } from './FieldFormFiller.type'

export type SectionResponseProps = {
  title: string
  sectionID: string
  editableStatus: boolean
  sendData: (val: any) => void
  sectionData: {
    title: string
    fields: FieldFormFillerProps[]
  }
}

export interface SectionInfo {
  title: string
  fields: Array<any>
  sectionID: string
}
