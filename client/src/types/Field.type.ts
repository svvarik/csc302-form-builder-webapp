export type FieldProps = {
    sendData: (val: any) => void
}

export type BaseInputProps = {
    sendResponse: (val: any) => void
    response?: string
}

export interface MCInputProps extends BaseInputProps {
    options?: string[]
}