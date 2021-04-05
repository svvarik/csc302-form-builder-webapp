import { FieldInfo } from './Field.type'

export type SectionProps = {
  title: string
  sectionID: string
  sendData: (val: any) => void
  sectionData?: {
    title: string
    fields: FieldInfo[]
  }
}

export interface SectionInfo {
  title: string
  fields: Array<any>
  sectionID: string
}
