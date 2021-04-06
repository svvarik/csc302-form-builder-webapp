// import { SectionProps } from './Section.type'
import { SectionInfo } from './SectionResponse.type'

export type FormResponseProps = {
  formID: string
  formTitle: string
  formDesc: string
  procedureID: string
  patientID?: string
  sections: Array<SectionInfo>
  editableStatus: boolean

  sendForm: (val: any) => void
}
