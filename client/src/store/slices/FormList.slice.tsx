import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { FormConfig } from '../../types/FormConfig.type'

export type FormListState = {
  forms: FormConfig[]
  complete?: FormConfig[]
}

export type FormPayload = {
  form: FormConfig
}

const initialState: FormListState = {
  forms: [
    {
      formID: '1',
      formTitle: 'Card 1',
      description:
        'This is a test card please let me know what I should change/if I can better use React in any way',
      dateCreated: 'January 1, 2021',
      dateModified: 'March 6, 2021',
      procedure: 'Post-mortem',
    },
    {
      formID: '2',
      formTitle: 'Card 2',
      description: 'COVID is a really bad thing',
      dateCreated: 'January 1, 2021',
      dateModified: 'March 6, 2021',
      procedure: 'Post-mortem',
    },
    {
      formID: '3',
      formTitle: 'Card 3',
      description: 'Maybe by 2030 things will be back to normal',
      dateCreated: 'January 1, 2021',
      dateModified: 'March 6, 2021',
      procedure: 'Post-mortem',
    },
    {
      formID: '4',
      formTitle: 'Card 4',
      description: 'Please go get your vaccine',
      dateCreated: 'January 1, 2021',
      dateModified: 'March 6, 2021',
      procedure: 'Post-mortem',
    },
    {
      formID: '5',
      formTitle: 'Card 5',
      description: 'Social distancing!',
      dateCreated: 'January 1, 2021',
      dateModified: 'March 6, 2021',
      procedure: 'Post-mortem',
    },
  ],
}

const FormListSlice = createSlice({
  name: 'FormList',
  initialState,
  reducers: {
    addForm(state, action: PayloadAction<FormPayload>) {
      const { form } = action.payload
      const newForms = state.forms.concat(form)
      state.forms = newForms
    },
    removeForm(state, action: PayloadAction<string>) {
      const formid = action.payload
      const newForms = state.forms.filter((td) => td.formID !== formid)
      state.forms = newForms
    },
  },
  extraReducers: {},
})

const FormListReducer = FormListSlice.reducer

export const { addForm, removeForm } = FormListSlice.actions

export default FormListReducer
