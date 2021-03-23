import { useDispatch } from 'react-redux'
import { useHistory, useLocation } from 'react-router-dom'
import {
  AppBar,
  Button,
  Container,
  Toolbar,
  fade,
  InputBase,
  makeStyles,
  Theme,
} from '@material-ui/core'
import SearchIcon from '@material-ui/icons/Search'
import { searchForms } from '../store/slices/FormList.slice'

const useStyles = makeStyles((theme: Theme) => ({
  grow: {
    flexGrow: 1,
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: 'auto',
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '40ch',
    },
  },
}))

const NavbarComponent: React.FC = (props: any) => {
  const classes = useStyles()
  const dispatch = useDispatch()
  const location = useLocation()
  const history = useHistory()
  const { pathname } = location

  const searchFormsHandler: (
    e: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void = (e) => {
    dispatch(searchForms(e.currentTarget.value))
  }

  return (
    <div className={classes.grow}>
      <AppBar position='static'>
        <Container maxWidth='md'>
          <Toolbar disableGutters>
            {pathname === '/' ? (
              <div className={classes.search} data-cy='searchContainer'>
                <div className={classes.searchIcon}>
                  <SearchIcon />
                </div>
                <InputBase
                  data-cy='searchInput'
                  placeholder='Search…'
                  classes={{
                    root: classes.inputRoot,
                    input: classes.inputInput,
                  }}
                  inputProps={{ 'aria-label': 'search' }}
                  onChange={(e) => searchFormsHandler(e)}
                />
              </div>
            ) : (
              <Button
                data-cy='homeButton'
                onClick={() => {
                  history.push('/')
                }}
                color='secondary'
              >
                HOME
              </Button>
            )}
          </Toolbar>
        </Container>
      </AppBar>
    </div>
  )
}

export default NavbarComponent
