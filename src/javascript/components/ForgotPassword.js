import React, { useState } from 'react'
import '../css/ForgotPassword.css'
import { BACKEND_URL, AUTH_API } from '../constant'
import { withTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import Modal from 'react-modal'
import emailImg from '../images/icon/email.png'
import usernameImg from '../images/icon/username.png'
import axios from 'axios'
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

const btn = {
  display: 'block',
  color: 'white',
  background: '#4D44B5',
  textAlign: 'center',
  border: 'none',
  padding: '15px',
  fontWeight: '400',
  fontSize: '32px',
  borderRadius: '30px',
}

Modal.setAppElement('#root')

function ForgotPassword(props) {
  const [email, setEmail] = useState('')
  const [username, setUserName] = useState('')
  const [message, setMessage] = useState('')
  const [emailCheck, setEmailCheck] = useState('')
  const [usernameCheck, setUsernameCheck] = useState('')
  let navigate = useNavigate()
  const [modalIsOpen, setIsOpen] = useState(false)
  const { t } = props
  const inputUsername = (event) => {
    setUserName(event.target.value)
  }

  const inputEmail = (event) => {
    setEmail(event.target.value)
  }
  const submitForm = () => {
    if (email === '') {
      setEmailCheck(t('common.error.emailEmpty'))
    } else if (!validator.isEmail(email)) {
      setEmailCheck(t('common.error.emailFormatIncorrect'))
    } else {
      setEmailCheck('')
    }
    if (username === '') {
      setUsernameCheck(t('common.error.usernameEmpty'))
    } else {
      setUsernameCheck('')
    }
    if (email !== '' && username !== '') {
      const url = BACKEND_URL + AUTH_API + 'users'
      axios
        .post(url, { username: username, email: email })
        .then((res) => {
          setIsOpen(true)
        })
        .catch(function (error) {
          setMessage(error.response.data)
        })
    }
  }
  function redirect() {
    navigate('/login')
  }
  return (
    <div className="forgotPage">
      <div className="body">
        <div className="outer">
          <div className="title">{t('common.text.forgot')}</div>
          <div className="message">{message}</div>
          <div className="inputGroup">
            <img src={emailImg} className="icon" alt=""></img>
            <input
              type="text"
              onChange={(event) => inputEmail(event)}
              className="input email"
              maxLength="100"
              placeholder={t('common.text.emailPlaceholder')}
            ></input>
            <div className="alert">{emailCheck}</div>
          </div>
          <div className="inputGroup">
            <img src={usernameImg} className="icon" alt=""></img>
            <input
              type="text"
              onChange={(event) => inputUsername(event)}
              className="input userName"
              maxLength="100"
              placeholder={t('common.text.usernamePlaceholder')}
            ></input>
            <div className="alert">{usernameCheck}</div>
          </div>
          <div className="under">
            <div className="block left">
              <div>{t('common.text.rememberPassword')}</div>
              <div>
                {t('common.text.backTo')}{' '}
                <a href="/login">{t('common.text.login')}</a>
              </div>
            </div>
            <div className="block right">
              <button
                type="button"
                className="btnContinue"
                onClick={() => submitForm()}
              >
                {t('common.text.continue')}
              </button>
            </div>
          </div>
        </div>
        <Modal isOpen={modalIsOpen} style={customStyles}>
          {t('common.text.popupForgot')}
          <div style={btnWrap}>
            <button
              style={btn}
              onClick={() => {
                redirect()
              }}
            >
              {t('common.text.goToLogin')}
            </button>
          </div>
        </Modal>
      </div>
    </div>
  )
}

export default withTranslation()(ForgotPassword)
