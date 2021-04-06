import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit'
import { FormConfig } from '../../types/FormConfig.type'
import { GetAllForms, DeleteForm, GetAllFormResponses } from '../../requests'

export type FormListState = {
  initialForms: FormConfig[]
  forms: FormConfig[]
  loading: boolean
  complete?: FormConfig[]
}

export type FormPayload = {
  form: FormConfig
}

const dummyForms = [
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
]

const initialState: FormListState = {
  initialForms: [],
  forms: [],
  loading: false,
}

export const fetchFormListThunk = createAsyncThunk(
  'FormList/fetch',
  async () => {
    try {
      const res = await GetAllForms()
      return res.json()
    } catch (err) {
      console.error(err)
      throw err
    }
  }
)

export const fetchAllFormResponsesThunk = createAsyncThunk(
  'FilledFormList/fetch',
  async () => {
    try {
      const res = await GetAllFormResponses()
      console.log(res)
      return res.json()
    } catch (err) {
      console.error(err)
      throw err
    }
  }
)

export const removeFromFormListThunk = createAsyncThunk(
  'FormList/remove',
  async (id: string) => {
    try {
      await DeleteForm(id) // or delete from requests.ts
      return id
    } catch (err) {
      console.error(err)
      throw err
    }
  }
)

const FormListSlice = createSlice({
  name: 'FormList',
  initialState,
  reducers: {
    addForm(state, action: PayloadAction<FormPayload>) {
      const { form } = action.payload
      const newForms = state.forms.concat(form)
      state.forms = newForms
    },
    searchForms(state, action: PayloadAction<string>) {
      const query = action.payload
      const newForms =
        query.length > 0
          ? state.initialForms.filter((td) => td.formTitle.includes(query))
          : state.initialForms
      state.forms = newForms
    },
  },
  extraReducers: (builder) => {
    builder.addCase(
      removeFromFormListThunk.fulfilled,
      (state, action: PayloadAction<string>) => {
        const formid = action.payload
        const newForms = state.forms.filter((td) => td.formID !== formid)
        state.forms = newForms
      }
    )
    builder.addCase(removeFromFormListThunk.pending, (state) => {
      state.loading = true
    })
    builder.addCase(removeFromFormListThunk.rejected, (state) => {
      state.loading = false
    })
    builder.addCase(
      fetchFormListThunk.fulfilled,
      // PayloadAction<FormConfig[]>
      (state, action: PayloadAction<any[]>) => {
        const now = new Date()
        state.forms = action.payload.map((res) => {
          const created = new Date(parseInt(res.formID, 10))
          return {
            formID: res.formID as string,
            formTitle: res.title as string,
            description: res.desc as string,
            dateCreated: created.toISOString().split('T')[0],
            dateModified: now.toISOString().split('T')[0],
            procedure: res.sections[0].title
              ? (res.sections[0].title as string)
              : 'N/A',
            username: 'Team ITN',
          }
        })
        state.initialForms = state.forms
        state.loading = false
      }
    )
    builder.addCase(fetchFormListThunk.rejected, (state) => {
      state.loading = false
    })
    builder.addCase(fetchFormListThunk.pending, (state) => {
      state.loading = true
    })
    builder.addCase(
      fetchAllFormResponsesThunk.fulfilled,
      (state, action: PayloadAction<any[]>) => {
        state.forms = action.payload
          .filter((res) => res.formID && res.title && res.desc)
          .map((res) => {
            const created = new Date(parseInt(res.formID, 10))
            return {
              formID: res.formID as string,
              formTitle: res.title as string,
              description: res.desc as string,
              procedure: '',
              username: '',
              dateCreated: created.toISOString().split('T')[0],
              dateModified: created.toISOString().split('T')[0],
            }
          })
      }
    )
    builder.addCase(fetchAllFormResponsesThunk.rejected, (state) => {
      state.loading = false
    })
    builder.addCase(fetchAllFormResponsesThunk.pending, (state) => {
      state.loading = true
    })
  },
})

const FormListReducer = FormListSlice.reducer

export const { addForm, searchForms } = FormListSlice.actions

export default FormListReducer
