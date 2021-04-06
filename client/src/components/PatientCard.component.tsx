import {
  Card,
  CardActions,
  CardContent,
  Button,
  Typography,
  makeStyles,
  Theme,
} from '@material-ui/core'
import { Link } from 'react-router-dom'

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    height: 180,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  actionContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
}))

type PatientCardProps = {
  formID: string
  formTitle: string
  description: string
}

const PatientCardComponent: React.FC<PatientCardProps> = ({
  description,
  formID,
  formTitle,
}) => {
  const classes = useStyles()
  return (
    <Card className={classes.root} variant='outlined' data-cy='patientCard'>
      <CardContent>
        <Typography variant='h5'>{formTitle}</Typography>
        <Typography variant='body2' color='textSecondary' gutterBottom>
          Form #{formID}
        </Typography>
        <Typography variant='body1'>{description}</Typography>
      </CardContent>
      <CardActions className={classes.actionContainer}>
        <Link to={`/fill-in-form/${formID}`}>
          <Button size='small'>Details</Button>
        </Link>
      </CardActions>
    </Card>
  )
}

export default PatientCardComponent
