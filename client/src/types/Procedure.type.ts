export type ProcedureInputProps = {
    sendData: (val: any) => void
    procedureId?: string
}

export type ProcedureType = {
    inputValue?: string
    procedure: string
    id?: string
}