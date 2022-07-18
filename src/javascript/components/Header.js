import * as React from 'react'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import Menu from '@mui/material/Menu'
import MenuIcon from '@mui/icons-material/Menu'

import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button'
import Tooltip from '@mui/material/Tooltip'
import MenuItem from '@mui/material/MenuItem'
import AdbIcon from '@mui/icons-material/Adb'

export default function Header() {
  return (
    <Toolbar sx={{ height: 200, backgroundColor: '#4D44B5' }}>
      <Typography
        variant="h5"
        noWrap
        component="a"
        href="/"
        sx={{
          mr: 2,
          display: { xs: 'none', md: 'flex' },
          fontFamily: 'Poppins , sans-serif',
          fontWeight: 600,
          fontSize: '2rem',
          letterSpacing: '.2rem',
          color: 'white',
          textDecoration: 'none',
        }}
      >
        CMC Academy
      </Typography>

      <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}></Box>
      <Typography
        variant="h5"
        noWrap
        component="a"
        href=""
        sx={{
          mr: 2,
          display: { xs: 'flex', md: 'none' },
          flexGrow: 1,
          fontWeight: 600,
          fontSize: '2rem',
          fontFamily: 'Poppins , sans-serif',
          letterSpacing: '.2rem',
          color: 'white',
          textDecoration: 'none',
        }}
      >
        CMC Academy
      </Typography>
      <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}></Box>

      <Box sx={{ flexGrow: 0 }}></Box>
    </Toolbar>
  )
}
