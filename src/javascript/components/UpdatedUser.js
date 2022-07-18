import React, { useState, useEffect } from 'react'
import { BACKEND_URL, USER_API, USER_URL, API, JWT_TYPE } from '../constant'
import { useParams } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import Modal from 'react-modal'
import { withTranslation } from 'react-i18next'
import axios from 'axios'
import '../css/UpdatedUser.css'
import validator from 'validator'

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    background: '#fb7b5d',
    fontWeight: '400',
    fontSize: '32px',
    color: '#000000',
    borderRadius: '30px',
    width: '800px',
    height: '150px',
    padding: '50px',
    transform: 'translate(-50%, -50%)',
  },
}

const btnWrap = {
  display: 'flex',
  justifyContent: 'center',
}

const btnN = {
  display: 'block',
  color: 'white',
  background: '#4D44B5',
  textAlign: 'center',
  border: 'none',
  padding: '15px',
  fontWeight: '400',
  fontSize: '32px',
  borderRadius: '30px',
  width: '200px',
  margin: '20px',
}

const btnY = {
  display: 'block',
  color: '#4D44B5',
  background: '#fb7b5d',
  textAlign: 'center',
  padding: '15px',
  fontWeight: '400',
  fontSize: '32px',
  borderRadius: '30px',
  width: '200px',
  margin: '20px',
  borderColor: '#4D44B5',
}
const title = {
  textAlign: 'center',
  fontFamily: 'Arial',
  fontWeight: 'Bold',
}
Modal.setAppElement('#root')

function UpdatedUser(props) {
  const { t } = props
  const [user, setUser] = useState({})
  let [roleUser, setRoleUser] = useState([])
  const [roles, setRoles] = useState([])
  const [username, setUsername] = useState()
  const [email, setEmail] = useState('')
  const [address, setAddress] = useState('')
  const [status, setStatus] = useState('')
  const [password, setPassword] = useState('')
  const [phone, setPhone] = useState('')
  let { user_id } = useParams()
  const jwt = localStorage.getItem('jwt')
  const [emailCheck, setEmailCheck] = useState('')
  const [addressCheck, setAddressCheck] = useState('')
  const [passwordCheck, setPasswordCheck] = useState('')
  const [phoneCheck, setPhoneCheck] = useState('')
  const [message, setMessage] = useState('')
  const [modalIsOpen, setIsOpen] = useState(false)
  let navigate = useNavigate()
  let getApi = async () => {
    const urlUser = BACKEND_URL + API + USER_API + `/detail?userId=${user_id}`
    const urlRole = BACKEND_URL + API + USER_API + `/findAllRoles`
    let getRes = await axios.get(urlUser, {
      headers: { Authorization: JWT_TYPE + jwt },
    })
    setUser(getRes.data)
    setRoleUser(getRes.data.roles)
    setUsername(getRes.data.username)
    setEmail(getRes.data.email)
    setAddress(getRes.data.address)
    setStatus(getRes.data.status)
    setPassword(getRes.data.password)
    setPhone(getRes.data.phone)
    let getRoles = await axios.get(urlRole, {
      headers: { Authorization: JWT_TYPE + jwt },
    })
    setRoles(getRoles.data)
  }
  useEffect(() => {
    getApi()
  }, [])

  function checkedRole(roleCheck) {
    let check = false
    roleUser.forEach((role) => {
      if (role.roleName === roleCheck) check = true
    })
    return check
  }

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
  function updated() {
    user.username = username
    user.email = email
    user.address = address
    user.status = status
    user.password = password
    user.phone = phone
    user.roles = roleUser
    const url = BACKEND_URL + API + USER_API + `/updated`
    axios
      .put(url, user, { headers: { Authorization: JWT_TYPE + jwt } })
      .then((res) => {
        setMessage(res.data)
      })
      .catch(function (error) {
        setMessage(error.response.data)
      })
    setIsOpen(false)
  }

  function btnSave() {
    let count = 0
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
      setIsOpen(true)
    }
  }

  function btnNo() {
    setIsOpen(false)
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
                disabled
                value={username}
                onChange={(event) => setUsername(event.target.value)}
                id="username"
                name="username"
              />
            </div>
            <div className="email">
              <label htmlFor="email">{t('common.label.email')}</label>
              <input
                className="inputView"
                type="text"
                maxLength="100"
                value={email}
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
                value={address}
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
                defaultValue={user.status === 0 ? '0' : '1'}
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
                value={password}
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
                value={phone}
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
                      defaultChecked={checkedRole(value.roleName)}
                      id={value.roleName}
                      name={value.roleName}
                      value={value.roleName}
                      onClick={(event) => checkingRole(event)}
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
      <Modal isOpen={modalIsOpen} style={customStyles}>
        <div style={title}>{t('common.text.areYouSure')}</div>
        <div style={btnWrap}>
          <button
            style={btnY}
            onClick={() => {
              updated()
            }}
          >
            {t('common.text.yes')}
          </button>
          <button
            style={btnN}
            onClick={() => {
              btnNo()
            }}
          >
            {t('common.text.no')}
          </button>
        </div>
      </Modal>
    </>
  )
}

export default withTranslation()(UpdatedUser)
