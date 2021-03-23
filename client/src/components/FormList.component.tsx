import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { makeStyles, GridList, GridListTile } from '@material-ui/core'
import { selectFormList } from '../store/store'
import FormCard from './FormCard.component'
import { fetchFormListThunk } from '../store/slices/FormList.slice'

const useStyles = makeStyles(() => ({
  root: {},
}))

const FormList: React.FC = () => {
  const classes = useStyles()
  const dispatch = useDispatch()
  const { forms } = useSelector(selectFormList)

  useEffect(() => {
    dispatch(fetchFormListThunk())
  }, [])

  return (
    <div className={classes.root}>
      <GridList spacing={2} cellHeight={400} cols={3}>
        {forms.map((tile) => (
          <GridListTile key={tile.formID} cols={1}>
            <FormCard {...tile} />
          </GridListTile>
        ))}
      </GridList>
    </div>
  )
}

export default FormList
