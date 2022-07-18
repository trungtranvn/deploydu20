import Grid from '@mui/material/Grid'
import { Avatar, MenuItem, Paper, TextField } from '@mui/material'
import LockIcon from '@mui/icons-material/Lock'
import { FormGroup } from '@mui/material'
import { FormControlLabel } from '@mui/material'
import { Checkbox } from '@mui/material'
import { Button } from '@mui/material'
import { BACKEND_URL, AUTH_API } from '../constant'
import { Link } from '@mui/material'
import { Box } from '@mui/material'
import React, { useState } from 'react'
import { withTranslation } from 'react-i18next'
import axios from 'axios'

class SigninForm extends React.Component {
  state = {
    username: '',
    password: '',
    isChecked: true,
  }

  componentDidMount() {
    if (localStorage.checkbox && localStorage.username !== '') {
      this.setState({
        isChecked: true,
        username: localStorage.username,
        password: localStorage.password,
      })
    }
  }

  onChangeValue = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    })
  }

  onChangeCheckbox = (event) => {
    this.setState({
      isChecked: event.target.checked,
    })
  }

  loginSubmit = () => {
    const { username, password, isChecked } = this.state
    if (isChecked && username !== '') {
      localStorage.username = username
      localStorage.password = password
      localStorage.checkbox = isChecked
    }
    if (!isChecked && localStorage.username == username) {
      localStorage.username = ''
      localStorage.password = ''
      localStorage.checkbox = isChecked
    }
    // here call the API to signup/login
    var url = BACKEND_URL + AUTH_API + 'signin'
    axios.post(url, { username: username, password: password }).then((res) => {
      if (res.data.code == 200) {
        localStorage.jwt = res.data.accessToken
        window.location = '/home'
      } else {
        localStorage.jwt = ''
        window.alert(res.data.message)
      }
    })
  }

  paperStyle = {
    padding: 20,
    height: '70vh',
    width: 380,
    margin: '20px auto',
    background: '#4D44B5',
  }
  avatarStyle = { width: '136px', height: '136px', margin: '20px' }
  userNameStyle = {
    background: 'rgba(255, 255, 255, 0.1)',
    borderRadius: '90px',
  }
  passwordStyle = {
    background: 'rgba(255, 255, 255, 0.1)',
    borderRadius: '90px',
    marginTop: '15px',
  }
  remenberMeStyle = { fontColor: 'white' }

  render() {
    const { username, password, isChecked } = this.state
    const { t } = this.props
    return (
      <Box
        sx={{
          width: '100%',
          position: 'absolute',
          backgroundColor: '#F5F5F5',
        }}
      >
        <Box
          sx={{
            width: '40%',
            backgroundColor: '#F5F5F5',
            float: 'left',
          }}
        >
          <Grid>
            <Paper elevation={10} style={this.paperStyle}>
              <Grid align="center">
                <Avatar style={this.avatarStyle}>
                  <LockIcon style={{}} />
                </Avatar>
              </Grid>

              <TextField
                id="username"
                name="username"
                value={username}
                onChange={this.onChangeValue}
                style={this.userNameStyle}
                label="UserName"
                fullWidth
                required
              />
              <TextField
                id="password"
                name="password"
                value={password}
                onChange={this.onChangeValue}
                style={this.passwordStyle}
                label="PassWord"
                placeholder="Enter Password"
                type={'password'}
                fullWidth
                required
              />

              <Box
                component="span"
                sx={{
                  borderRadius: '90px',
                  margintop: '10px',
                }}
              >
                <Button
                  style={{
                    width: '100%',
                    height: '50px',
                    backgroundColor: '#FB7B5D',
                    marginTop: '15px',
                    borderRadius: '90px',
                  }}
                  id="submit"
                  type="button"
                  onClick={this.loginSubmit}
                >
                  Login
                </Button>
              </Box>

              <Box sx={{ width: '100%' }}>
                <Box
                  sx={{
                    float: 'left',
                    height: '60px',
                  }}
                >
                  <FormGroup>
                    <FormControlLabel
                      control={<Checkbox defaultChecked />}
                      label="Remember Me"
                      style={this.remenberMeStyle}
                      onChange={this.onChangeCheckbox}
                    />
                  </FormGroup>
                </Box>
                <Box sx={{ float: 'right', height: '60px' }}>
                  <Link
                    style={{ color: 'white' }}
                    component="button"
                    variant="body2"
                    onClick={() => {
                      window.location = '/forgot'
                    }}
                  >
                    {t('common.text.forgot')}
                  </Link>
                </Box>
              </Box>
              <Box sx={{ marginTop: '200px', textAlign: 'center' }}>
                <Box
                  sx={{
                    display: 'inline',
                    marginRight: '20px',
                  }}
                >
                  <Link
                    style={{ color: 'white' }}
                    component="button"
                    variant="body2"
                    onClick={() => {
                      window.location = '/forgot'
                    }}
                  >
                    {t('common.text.donthaveanaccount')}
                  </Link>
                </Box>
                <Box
                  sx={{
                    display: 'inline',
                  }}
                >
                  <Link
                    style={{ color: '#FB7B5D' }}
                    component="button"
                    variant="body2"
                    onClick={() => {}}
                  >
                    {t('common.text.signup')}
                  </Link>
                </Box>
              </Box>
            </Paper>
          </Grid>
        </Box>
        <Box
          sx={{
            width: '60%',
            backgroundColor: '#F5F5F5',

            float: 'right',
          }}
        >
          <Box
            sx={{
              paddingTop: '50px',
              paddingLeft: '1000px',
            }}
          >
            <TextField
              id="select"
              value={this.state.lang}
              select
              onChange={this.handleChange}
            >
              <MenuItem value="Vietnamese">Vietnamese</MenuItem>
              <MenuItem value="English">English</MenuItem>
            </TextField>
          </Box>
          <>
            <Box
              sx={{
                paddingTop: '40px',
                paddingLeft: '50px',
                width: '300px',
                textAlign: 'center',
              }}
            >
              <span
                style={{
                  color: '#056CF2',
                  fontSize: '50px',
                }}
              >
                Lean
              </span>{' '}
              <span
                style={{
                  fontSize: '30px',
                }}
              >
                {' '}
                At Your Own <br></br> Pace.{' '}
              </span>
            </Box>
          </>
          <Avatar
            style={{
              marginTop: '50px',
              marginLeft: '100px',
              height: '300px',
              width: '300px',
            }}
            alt="Remy Sharp"
            src="https://vnn-imgs-f.vgcloud.vn/2020/03/03/15/bich-phuong-ngoi-sao-khong-an-may-1.jpg"
          />
          <Avatar
            style={{
              marginTop: '-300px',
              marginLeft: '400px',
              height: '100px',
              width: '100px',
            }}
            alt="Remy Sharp"
            src="https://vnn-imgs-f.vgcloud.vn/2020/03/03/15/bich-phuong-ngoi-sao-khong-an-may-1.jpg"
          />
          <Avatar
            style={{
              marginTop: '50px',
              marginLeft: '400px',
              height: '200px',
              width: '200px',
              borderLeft: '50px solid transparent',
              borderRight: '50px solid transparent',
              borderBottom: '50px solid transparent',
            }}
            alt="Remy Sharp"
            src="https://vnn-imgs-f.vgcloud.vn/2020/03/03/15/bich-phuong-ngoi-sao-khong-an-may-1.jpg"
          />
        </Box>
      </Box>
    )
  }
}

export default withTranslation()(SigninForm)
