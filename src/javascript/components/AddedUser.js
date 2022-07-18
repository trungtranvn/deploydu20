import React, { useState, useEffect } from 'react'
import { BACKEND_URL, USER_API, USER_URL, API, JWT_TYPE } from '../constant'
import { useNavigate } from 'react-router-dom'
import { withTranslation } from 'react-i18next'
import axios from 'axios'
import '../css/UpdatedUser.css'
import validator from 'validator'

function UpdatedUser(props) {
  const { t } = props
  const [user, setUser] = useState({})
  let [roleUser, setRoleUser] = useState([])
  const [roles, setRoles] = useState([])
  const [username, setUsername] = useState()
  const [email, setEmail] = useState('')
  const [address, setAddress] = useState('')
  const [status, setStatus] = useState(1)
  const [password, setPassword] = useState('')
  const [phone, setPhone] = useState('')
  const jwt = localStorage.getItem('jwt')
  const [usernameCheck, setUsernameCheck] = useState('')
  const [emailCheck, setEmailCheck] = useState('')
  const [addressCheck, setAddressCheck] = useState('')
  const [passwordCheck, setPasswordCheck] = useState('')
  const [phoneCheck, setPhoneCheck] = useState('')
  const [message, setMessage] = useState('')
  let navigate = useNavigate()
  let getApi = async () => {
    const urlRole = BACKEND_URL + API + USER_API + `/findAllRoles`
    let getRoles = await axios.get(urlRole, {
      headers: { Authorization: JWT_TYPE + jwt },
    })
    setRoles(getRoles.data)
  }
  useEffect(() => {
    getApi()
  }, [])

  function checkingRole(event) {
    roles.forEach((role) => {
      if (
        event.target.checked === true &&
        event.target.value === role.roleName
      ) {
        roleUser.push(role)
      }
      if (event.target.checked === false) {
        roleUser = roleUser.filter((item) => {
          return item.roleName !== event.target.value
        })
      }
      setRoleUser(roleUser)
    })
  }
  function added() {
    user.username = username
    user.email = email
    user.address = address
    user.status = status
    user.password = password
    user.phone = phone
    user.roles = roleUser
    const url = BACKEND_URL + API + USER_API + `/added`
    axios
      .post(url, user, { headers: { Authorization: JWT_TYPE + jwt } })
      .then((res) => {
        setMessage(res.data)
      })
      .catch(function (error) {
        setMessage(error.response.data)
      })
  }

  function btnSave() {
    let count = 0
    if (username === '') {
      setUsernameCheck(t('common.error.usernameEmpty'))
      count++
    } else if (!validator.isAlphanumeric(username)) {
      setUsernameCheck(t('common.error.usernameFormatIncorrect'))
      count++
    } else {
      setUsernameCheck('')
    }

    if (email === '') {
      setEmailCheck(t('common.error.emailEmpty'))
      count++
    } else if (!validator.isEmail(email)) {
      setEmailCheck(t('common.error.emailFormatIncorrect'))
      count++
    } else {
      setEmailCheck('')
    }

    if (address === '') {
      setAddressCheck(t('common.error.addressEmpty'))
      count++
    } else {
      setAddressCheck('')
    }

    if (
      validator.isStrongPassword(password, {
        minLength: 6,
        minUppercase: 1,
        minLowercase: 0,
      }) ||
      validator.isStrongPassword(password, {
        minLength: 6,
        minUppercase: 0,
        minLowercase: 1,
      })
    ) {
      setPasswordCheck('')
    } else if (password === '') {
      setPasswordCheck(t('common.error.passwordEmpty'))
      count++
    } else {
      setPasswordCheck(t('common.error.passwordFormatIncorrect'))
      count++
    }

    if (phone === '') {
      setPhoneCheck(t('common.error.phoneEmpty'))
      count++
    } else if (!validator.isMobilePhone(phone)) {
      setPhoneCheck(t('common.error.phoneFormatIncorrect'))
      count++
    } else {
      setPhoneCheck('')
    }

    if (count === 0) {
      added()
    }
  }

  function redirect() {
    navigate(USER_URL + 'search')
  }

  return (
    <>
      <div className="background">
        <img
          src={require(`../images/avatar/nvha.png`)}
          className="photo"
          alt=""
        />
        <div className="message">{message}</div>
        <div className="flex-input">
          <div className="column one">
            <div className="username">
              <label htmlFor="username">{t('common.label.username')}</label>
              <input
                className="inputView"
                type="text"
                maxLength="100"
                onChange={(event) => setUsername(event.target.value)}
                id="username"
                name="username"
              />
              <div className="alert">{usernameCheck}</div>
            </div>
            <div className="email">
              <label htmlFor="email">{t('common.label.email')}</label>
              <input
                className="inputView"
                type="text"
                maxLength="100"
                onChange={(event) => setEmail(event.target.value)}
                id="email"
                name="email"
              />
              <div className="alert">{emailCheck}</div>
            </div>
            <div className="address">
              <label htmlFor="address">{t('common.label.address')}</label>
              <input
                className="inputView"
                type="text"
                maxLength="2000"
                onChange={(event) => setAddress(event.target.value)}
                id="address"
                name="address"
              />
              <div className="alert">{addressCheck}</div>
            </div>
            <div className="status">
              <label htmlFor="status">{t('common.text.status')}</label>
              <select
                name="status"
                id="status"
                className="inputView"
                onChange={(event) => setStatus(event.target.value)}
              >
                <option value="1">{t('common.text.active')}</option>
                <option value="0">{t('common.text.inactive')}</option>
              </select>
            </div>
          </div>
          <div className="column two">
            <div className="password">
              <label htmlFor="password">{t('common.label.password')}</label>
              <input
                className="inputView"
                type="password"
                maxLength="100"
                onChange={(event) => setPassword(event.target.value)}
                id="password"
                name="password"
              />
              <div className="alert">{passwordCheck}</div>
            </div>
            <div className="phone">
              <label htmlFor="phone">{t('common.label.phone')}</label>
              <input
                className="inputView"
                type="text"
                maxLength="13"
                onChange={(event) => setPhone(event.target.value)}
                id="phone"
                name="phone"
              />
              <div className="alert">{phoneCheck}</div>
            </div>
            <div className="role">
              <label htmlFor="role">{t('common.text.role')}</label>
              {roles.map((value, key) => {
                return (
                  <div key={key}>
                    <input
                      className="inputRole"
                      type="checkbox"
                      id={value.roleName}
                      name={value.roleName}
                      value={value.roleName}
                      onClick={(event) => checkingRole(event)}
                      defaultChecked={value.roleName === 'ADMIN' ? true : false}
                    />
                    <label htmlFor={value.roleName} className="labelRole">
                      {value.roleName}
                    </label>
                  </div>
                )
              })}
            </div>
            <div className="groupButton">
              <button
                type="button"
                className="btnSave"
                onClick={() => btnSave()}
              >
                {t('common.text.save')}
              </button>
              <button
                type="button"
                onClick={() => {
                  redirect()
                }}
                className="btnClose"
              >
                {t('common.text.close')}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default withTranslation()(UpdatedUser)
