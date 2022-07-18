import { Box } from '@mui/system'
import React from 'react'
import CircleIcon from '@mui/icons-material/Circle'

function HeaderLogin() {
  return (
    <Box
      sx={{
        backgroundColor: '#4D44B5;',
        height: '254px',
        width: '100%',
      }}
    >
      <Box
        sx={{
          color: 'white',
          fontSize: '50px',
          fontStyle: 'bold',
          paddingLeft: '50px',
          paddingTop: '90px',
          fontWeight: 'bold',
          float: 'left',
          position: 'a',
        }}
      >
        CMC ACADEMY
      </Box>

      <CircleIcon
        style={{
          paddingTop: '100px',
          paddingLeft: '1450px',
          color: '#FB7D5B',
          width: '900px',
          height: '400px',
          position: 'absolute',
          display: 'flex',
          borderTopLeftRadius: '110px',
          borderTopRightRadius: '110px',
          borderBottom: '0',
        }}
      ></CircleIcon>

      <CircleIcon
        style={{
          color: '#FCC43E',
          width: '1000px',
          height: '500px',
          paddingTop: '50px',
          paddingLeft: '1550px',
          position: 'absolute',
          display: 'flex',
        }}
      ></CircleIcon>
    </Box>
  )
}
export default HeaderLogin
