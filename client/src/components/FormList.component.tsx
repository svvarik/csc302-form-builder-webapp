import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useLocation } from 'react-router-dom'
import { makeStyles, GridList, GridListTile } from '@material-ui/core'
import { selectFormList } from '../store/store'
import FormCard from './FormCard.component'
import { fetchFormListThunk } from '../store/slices/FormList.slice'
import PatientCard from './PatientCard.component'

const useStyles = makeStyles(() => ({
  root: {},
}))

type FormListProps = {
  isPatientList?: boolean
}
const FormList: React.FC<FormListProps> = ({ isPatientList }) => {
  const classes = useStyles()
  const dispatch = useDispatch()
  const { forms } = useSelector(selectFormList)
  const location = useLocation()
  const { pathname } = location

  useEffect(() => {
    if (pathname === '/') {
      dispatch(fetchFormListThunk())
    }
  }, [pathname])

  return (
    <div className={classes.root}>
      <GridList
        spacing={2}
        cellHeight={forms[0] && forms[0].username.length === 0 ? 200 : 400}
        cols={3}
      >
        {forms.map((tile) => (
          <GridListTile key={tile.formID} cols={1}>
            {tile.username.length > 0 ? (
              <FormCard
                dateCreated={tile.dateCreated}
                dateModified={tile.dateModified}
                description={tile.description || ''}
                formID={tile.formID}
                formTitle={tile.formTitle || ''}
                procedure={tile.procedure || ''}
                username={tile.username}
              />
            ) : (
              <PatientCard
                description={tile.description || ''}
                formID={tile.formID}
                formTitle={tile.formTitle || ''}
              />
            )}
          </GridListTile>
        ))}
      </GridList>
    </div>
  )
}

export default FormList
