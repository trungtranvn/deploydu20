import axios from 'axios'
import { BACKEND_URL, AUTH_API } from '../constant'
import { withTranslation } from 'react-i18next'
import { useState } from 'react'

const Register = (props) => {
  const { t } = props

  const { username, email, password } = useState

  function handleChangeUsername(value) {
    this.setState({ username: value })
  }

  function handleChangePassword(value) {
    this.setState({ password: value })
  }

  function handleChangeEmail(value) {
    this.setState({ email: value })
  }

  function handleSubmit() {
    var username = this.state.username
    var email = this.state.email
    var password = this.state.password
    var url = BACKEND_URL + AUTH_API + 'signup'
    axios
      .post(url, { username: username, email: email, password: password })
      .then((res) => {})
  }

  return (
    <div className="container">
      <header className="jumbotron">
        <h3>Register page</h3>
      </header>
      <form onSubmit={handleSubmit}>
        <label>
          {t('common.text.username')}
          <input
            type="text"
            value={username}
            onChange={(e) => handleChangeUsername(e.target.value)}
          />
        </label>
        <label>
          {t('common.text.email')}
          <input
            type="text"
            value={email}
            onChange={(e) => handleChangeEmail(e.target.value)}
          />
        </label>
        <label>
          {t('common.text.password')}
          <input
            type="text"
            value={password}
            onChange={(e) => handleChangePassword(e.target.value)}
          />
        </label>
        <input type="submit" value="Submit" />
      </form>
    </div>
  )
}
export default withTranslation()(Register)
