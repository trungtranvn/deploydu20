import React, { useState, useEffect } from 'react'
import { withTranslation, useTranslation } from 'react-i18next'
import {
  BACKEND_URL,
  USER_API,
  PAGE_SIZE,
  PAGE_NO,
  USER_URL,
} from '../constant'
import Header from './Header'
import Container from '@mui/material/Container'
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive'
import SettingsIcon from '@mui/icons-material/Settings'
import PersonPinIcon from '@mui/icons-material/PersonPin'
import { Grid } from '@mui/material'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import { Button, Checkbox } from '@mui/material'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import AddBoxIcon from '@mui/icons-material/AddBox'
import { DataGrid } from '@mui/x-data-grid'
import Avatar from '@mui/material/Avatar'
import FilterAltIcon from '@mui/icons-material/FilterAlt'
import Pagination from '@mui/material/Pagination'
import { useNavigate } from 'react-router-dom'
import List from '@mui/material/List'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import Collapse from '@mui/material/Collapse'
import ExpandLess from '@mui/icons-material/ExpandLess'
import ExpandMore from '@mui/icons-material/ExpandMore'
import StarBorder from '@mui/icons-material/StarBorder'
import HomeIcon from '@mui/icons-material/Home'

function SearchUser() {
  const [pageCount, setPageCount] = useState()
  const [users, setUsers] = useState([])
  const [searchKey, setSearchKey] = useState('')
  const [page, setPage] = useState()
  const [filters] = useState([])
  const { t, i18n } = useTranslation()

  let navigate = useNavigate()
  const token = localStorage.getItem('jwt')
  useEffect(() => {
    const fetchUsers = async () => {
      const searchBody = { pageNo: PAGE_NO, pageSize: PAGE_SIZE }
      const res = await fetch(BACKEND_URL + USER_API, {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
          authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(searchBody),
      })
      const data = await res.json()
      setUsers(data.content)
      setPageCount(data.totalPages)
    }

    fetchUsers()
  }, [])

  const paginateTable = async (pageNo) => {
    const searchBody = { pageNo: pageNo, pageSize: PAGE_SIZE }
    const res = await fetch(BACKEND_URL + USER_API, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
        authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(searchBody),
    })
    const data = await res.json()
    return data.content
  }

  const handleCheck = (event) => {
    if (event.target.checked) {
      if (!filters.includes(event.target.value)) {
        filters.push(event.target.value)
      }
    } else {
      for (var i = 0; i < filters.length; i++) {
        if (filters[i] === event.target.value) {
          filters.splice(i, 1)
        }
      }
    }
    searchUsers(searchKey)
  }

  const searchUsers = async (e) => {
    const key = e.target.value
    setSearchKey(e)
    const fil = filters.toString()
    const searchBody = {
      pageNo: PAGE_NO,
      pageSize: PAGE_SIZE,
      filters: fil,
      keyword: key,
    }

    const res = await fetch(BACKEND_URL + USER_API, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
        authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(searchBody),
    })
    const data = await res.json()
    const total = data.totalPages
    setUsers(data.content)
    setPageCount(total)
  }

  const handlePageClick = async (data) => {
    let pageNo = data - 1
    const fetchedData = await paginateTable(pageNo)
    setUsers(fetchedData)
  }

  const CustomPagination = () => {
    return (
      <Pagination
        color="primary"
        count={pageCount}
        page={page}
        onChange={(event, value) => {
          setPage(value)
          handlePageClick(value)
        }}
      />
    )
  }

  const handleCellClick = (param, event) => {
    event.stopPropagation()
    navigate(USER_URL + `updated/${param.row.id}`)
  }

  const navigateAddUser = (event) => {
    event.stopPropagation()
    navigate(USER_URL + `added`)
  }

  const rowEvents = (param, row) => {
    navigate(`/user/detail/${param.row.id}`)
  }
  const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
    {
      headerName: 'Avatar',
      renderCell: (cellValues) => {
        return <Avatar>N</Avatar>
      },
    },
    {
      field: 'username',
      headerName: t('common.text.username'),
    },
    { field: 'email', headerName: t('common.text.email'), width: 250 },
    {
      field: 'phone',
      headerName: t('common.text.phone'),
      width: 150,
    },
    {
      field: 'address',
      headerName: t('common.text.address'),
      sortable: false,
      width: 300,
    },
    {
      field: t('common.text.action'),
      renderCell: (cellValues) => {
        return (
          <Button
            variant="contained"
            color="error"
            onClick={(event) => {
              handleCellClick(cellValues, event)
            }}
          >
            {t('common.text.edit')}
          </Button>
        )
      },
    },
  ]
  const [open, setOpen] = React.useState(false)

  const handleClick = () => {
    setOpen(!open)
  }

  const checkBoxFields = ['Username', 'Email', 'Phone', 'Address']

  return (
    <Container
      sx={{ fontFamily: 'Poppins , sans-serif' }}
      root
      disableGutters
      maxWidth="xxl"
    >
      <Header />
      <Box disableGutters sx={{ backgroundColor: 'white', flexGrow: 1 }}>
        <Grid container>
          <Grid item xs={3} xl={3}>
            <Box sx={{ border: 0, backgroundColor: '#857DB1', height: '50vW' }}>
              <List
                sx={{
                  width: '100%',
                  p: 10,
                  paddingTop: 20,
                  maxWidth: 360,
                  color: 'white',
                }}
                component="nav"
                aria-labelledby="nested-list-subheader"
              >
                <ListItemButton href="/">
                  <ListItemIcon>
                    <HomeIcon />
                  </ListItemIcon>
                  <ListItemText primary={t('common.text.dashboard')} />
                </ListItemButton>
                <ListItemButton>
                  <ListItemIcon>
                    <HomeIcon />
                  </ListItemIcon>
                  <ListItemText primary={t('common.text.example')} />
                </ListItemButton>
                <ListItemButton>
                  <ListItemIcon>
                    <HomeIcon />
                  </ListItemIcon>
                  <ListItemText primary={t('common.text.example')} />
                </ListItemButton>
                <ListItemButton>
                  <ListItemIcon>
                    <HomeIcon />
                  </ListItemIcon>
                  <ListItemText primary={t('common.text.example')} />
                </ListItemButton>
                <ListItemButton onClick={handleClick}>
                  <ListItemIcon>
                    <PersonPinIcon />
                  </ListItemIcon>
                  <ListItemText primary={t('common.text.usermanagement')} />
                  {open ? <ExpandLess /> : <ExpandMore />}
                </ListItemButton>
                <Collapse in={open} timeout="auto" unmountOnExit>
                  <List component="div" disablePadding>
                    <ListItemButton sx={{ pl: 4 }} href="/user/search">
                      <ListItemIcon>
                        <StarBorder />
                      </ListItemIcon>
                      <ListItemText primary={t('common.text.searchuser')} />
                    </ListItemButton>

                    <ListItemButton sx={{ pl: 4 }} href="/user/add">
                      <ListItemIcon>
                        <StarBorder />
                      </ListItemIcon>
                      <ListItemText primary={t('common.text.adduser')} />
                    </ListItemButton>

                    <ListItemButton sx={{ pl: 4 }} href="/user/edit">
                      <ListItemIcon>
                        <StarBorder />
                      </ListItemIcon>
                      <ListItemText primary={t('common.text.edituser')} />
                    </ListItemButton>
                    <ListItemButton sx={{ pl: 4 }} href="/user/view">
                      <ListItemIcon>
                        <StarBorder />
                      </ListItemIcon>
                      <ListItemText primary={t('common.text.viewuser')} />
                    </ListItemButton>
                    <ListItemButton sx={{ pl: 4 }} href="/user/delete">
                      <ListItemIcon>
                        <StarBorder />
                      </ListItemIcon>
                      <ListItemText primary={t('common.text.deleteuser')} />
                    </ListItemButton>
                  </List>
                </Collapse>
                <ListItemButton>
                  <ListItemIcon>
                    <HomeIcon />
                  </ListItemIcon>
                  <ListItemText primary={t('common.text.rolemanagement')} />
                </ListItemButton>
                <ListItemButton>
                  <ListItemIcon>
                    <HomeIcon />
                  </ListItemIcon>
                  <ListItemText
                    primary={t('common.text.permissionmanagement')}
                  />
                </ListItemButton>
              </List>
            </Box>
          </Grid>
          <Grid item xs={9} xl={9}>
            <Box sx={{ border: 0, backgroundColor: '#F3F4FF', height: '50vW' }}>
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  p: 4,
                  backgroundColor: 'inherit',
                }}
              >
                {' '}
                <Typography
                  component="a"
                  href=""
                  sx={{
                    mr: 2,
                    flexGrow: 1,
                    fontFamily: 'Poppins , sans-serif',
                    fontSize: '2rem',
                    fontWeight: 700,
                    color: '#303972',
                    textDecoration: 'none',
                    maxWidth: '400px',
                  }}
                >
                  {t('common.text.searchuser')}
                </Typography>
                <Box sx={{ display: 'flex' }}>
                  <NotificationsActiveIcon
                    sx={{
                      border: 2,
                      borderRadius: 50,
                      borderSpacing: '10px',
                      borderColor: 'white',
                      color: 'gray',
                      fontSize: '40px',
                      marginRight: '30px',
                      backgroundColor: 'white',
                    }}
                  />
                  <SettingsIcon
                    sx={{
                      border: 2,
                      borderRadius: 50,
                      borderSpacing: '10px',
                      borderColor: 'white',
                      color: 'gray',
                      fontSize: '40px',
                      marginRight: '30px',
                      backgroundColor: 'white',
                    }}
                  />
                  <Grid
                    direction="column"
                    justifyContent="center"
                    alignItems="center"
                  >
                    <Box sx={{ fontWeight: 'bold' }}>Nobita A.</Box>
                    <Box>Admin</Box>
                  </Grid>
                  <PersonPinIcon
                    sx={{
                      border: 2,
                      borderRadius: 50,
                      borderSpacing: '10px',
                      borderColor: 'white',
                      color: '#C1BBEB',
                      fontSize: '40px',
                      backgroundColor: '#C1BBEB',
                      marginLeft: '20px',
                    }}
                  />
                </Box>
              </Box>
              <Box
                sx={{
                  display: 'flex',
                  paddingLeft: 3,
                  backgroundColor: 'inherit',
                  justifyContent: 'space-between',
                }}
              >
                <TextField
                  id="search-bar"
                  className="text"
                  // onInput={(e) => {
                  //   setSearchQuery(e.target.value)
                  // }}
                  label={t('common.text.entersearchkeyword')}
                  variant="outlined"
                  placeholder={t('common.text.searchplaceholder')}
                  size="small"
                  sx={{ width: '600px' }}
                  onChange={searchUsers}
                />
                <Box>
                  <Button
                    variant="contained"
                    sx={{
                      border: 1,
                      borderRadius: 20,
                      marginRight: '20px',
                      backgroundColor: 'white',
                      borderColor: '#4D44B5',
                      color: '#4D44B5',
                      '&:hover': {
                        color: 'white',
                      },
                    }}
                  >
                    {t('common.text.newest')} <KeyboardArrowDownIcon />
                  </Button>
                  <Button
                    variant="contained"
                    onClick={(event) => {
                      navigateAddUser(event)
                    }}
                    sx={{
                      border: 1,
                      borderRadius: 20,
                      backgroundColor: '#4D44B5',
                      marginRight: '30px',
                      borderColor: '#4D44B5',
                      color: 'white',
                      '&:hover': {
                        color: 'white',
                      },
                    }}
                  >
                    {t('common.text.newuser')} <AddBoxIcon />
                  </Button>
                </Box>
              </Box>
              <Box className="filters" sx={{ paddingLeft: 3, paddingTop: 3 }}>
                <FilterAltIcon />
                {checkBoxFields &&
                  checkBoxFields.map((fil) => (
                    <label>
                      <Checkbox
                        value={fil.toLowerCase()}
                        onChange={(event) => {
                          handleCheck(event)
                        }}
                      />
                      {fil}
                    </label>
                  ))}
              </Box>
              <Box className="dataTable" sx={{ height: '700px', p: 4 }}>
                <DataGrid
                  sx={{ p: 3 }}
                  rows={users}
                  columns={columns}
                  checkboxSelection
                  disableColumnFilter
                  disableColumnMenu
                  pagination
                  components={{
                    Pagination: CustomPagination,
                  }}
                  onRowClick={rowEvents}
                />
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Container>
  )
}

export default withTranslation()(SearchUser)
