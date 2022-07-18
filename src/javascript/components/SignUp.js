import React, { useState } from 'react'
import '../css/SignUp.css'
import { BACKEND_URL, AUTH_API } from '../constant'
import { withTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import validator from 'validator'
function SignUp(props) {
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [address, setAddress] = useState('')
  const [password, setPassword] = useState('')
  const [phone, setPhone] = useState('')
  const [photo, setPhoto] = useState('')
  const [result, setResult] = useState('')
  const [error, setError] = useState('')
  const [validationMsg, setValidationMsg] = useState({})
  var url = BACKEND_URL + AUTH_API + 'dangki'
  let navigate = useNavigate()
  const { t } = props
  const reUsername = /^[a-zA-Z0-9]*$/
  const rePass =
    /^(?=(.*[a-zA-Z]){1,})(?=(.*[\d]){1,})(?=(.*[\W]){1,})(?!.*\s).{8,}$/
  const rePhone = /[\d]{10,13}/
  const validateAll = () => {
    const msg = {}
    if (
      validator.isEmpty(username) ||
      !reUsername.test(username) ||
      username.length >= 100
    ) {
      msg.username = t('common.error.usernameFormat')
    }
    if (validator.isEmpty(email) || !validator.isEmail(email)) {
      msg.email = t('common.error.emailFormat')
    }
    if (validator.isEmpty(address) || address > 20000) {
      msg.address = t('common.error.addressFormat')
    }
    if (validator.isEmpty(password) || !rePass.test(password)) {
      msg.password = t('common.error.passwordFormat')
    }
    if (validator.isEmpty(phone) || !rePhone.test(phone)) {
      msg.phone = t('common.error.phoneFormat')
    }

    setValidationMsg(msg)
    if (Object.keys(msg).length > 0) return false
    return true
  }
  async function handleSubmit() {
    const isValid = validateAll()
    if (!isValid) return

    try {
      await axios
        .post(url, {
          username: username,
          email: email,
          address: address,
          password: password,
          phone: phone,
          photo: photo,
        })
        .then((resp) => {
          alert(resp.data)
          navigate('/login')
        })
        .catch(function (error) {
          setError(error.response.data)
        })
    } catch (err) {
      setError(err)
    }
  }
  return (
    <div className="App">
      <header className="App-header">
        <h2 className="title-header">CMC ACADEMY</h2>
        <div className="circle-small"></div>
        <div className="circle-big"></div>
      </header>
      <div className="form-signup">
        <p>
          <b>{t('common.title.signUp')}</b>
        </p>
        <div className="form-left">
          <label>{t('common.label.username')}</label>
          <br></br>
          <input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            type="text"
            placeholder="Maria"
          />
          <p className="error-validate">{validationMsg.username}</p>
          <label>{t('common.label.email')}</label>
          <br></br>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            placeholder="Historia@mail.com"
          />
          <p className="error-validate">{validationMsg.email}</p>
          <label>{t('common.label.address')}</label>
          <br></br>
          <textarea
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            type="text"
            placeholder={t('common.placeholder.address')}
          ></textarea>
          <p className="error-validate">{validationMsg.address}</p>
        </div>
        <div className="form-right">
          <label>{t('common.label.password')}</label>
          <br></br>
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            placeholder="Historia"
          />
          <p className="error-validate">{validationMsg.password}</p>
          <label>{t('common.label.phone')}</label>
          <br></br>
          <input
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            type="text"
            placeholder="0983660583"
          />
          <p className="error-validate">{validationMsg.phone}</p>
          <label>{t('common.label.photo')}</label>
          <input
            id="fileName"
            value={photo}
            onChange={(e) => {
              setPhoto(e.target.value)
            }}
            type="file"
            accept=".png, .jpg"
          />
        </div>
      </div>
      <div className="result">{result} </div>
      <div className="error">{error} </div>
      <div className="div-buttom">
        <button className="buttom-signup" onClick={handleSubmit}>
          {t('common.title.signUp')}
        </button>
        <p>
          {t('common.text.haveAcount')}
          <a href="/login"> {t('common.text.login')}</a>
        </p>
      </div>
    </div>
  )
}

export default withTranslation()(SignUp)
