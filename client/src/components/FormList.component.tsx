import React from 'react'
import { useSelector } from 'react-redux'
import { makeStyles, GridList, GridListTile } from '@material-ui/core'
import { selectFormList } from '../store/store'
import FormCard from './FormCard.component'

const useStyles = makeStyles(() => ({
  root: {},
}))

const FormList: React.FC = () => {
  const classes = useStyles()
  const { forms } = useSelector(selectFormList)
  return (
    <div className={classes.root}>
      <GridList cellHeight={400} cols={3}>
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
