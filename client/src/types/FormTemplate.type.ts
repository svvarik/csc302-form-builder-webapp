import { SectionInfo } from './Section.type'

export type FormTemplateProps = {
  sendForm: (val: any) => void
  formData?: {
    title?: string
    desc?: string
    formID?: string
    sections?: SectionInfo[]
  }
}
