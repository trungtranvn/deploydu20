import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import Login from './components/Login'
import { USER_URL } from './constant'
import Register from './components/Register'
import Home from './components/Home'
import ForgotPassword from './components/ForgotPassword'
import ViewUserDetail from './components/ViewUserDetail'
import Profile from './components/Profile'
import SearchUser from './components/SearchUser'
import { withTranslation, useTranslation } from 'react-i18next'
import { useState } from 'react'
import SignUp from './components/SignUp'
import UpdatedUser from './components/UpdatedUser'
import AddedUser from './components/AddedUser'
const App = () => {
  const { t, i18n } = useTranslation()
  const [currentUser, setCurrentUser] = useState(localStorage.jwt)
  function changeLanguage(lang) {
    i18n.changeLanguage(lang)
  }
  return (
    <div>
      <div>
        <button onClick={() => changeLanguage('vn')}>VN</button>
        <button onClick={() => changeLanguage('en')}>EN</button>
        <h1>{t('Welcome to React')}</h1>
      </div>
      <div className="container mt-3">
        <BrowserRouter>
          <nav className="navbar navbar-expand navbar-dark bg-dark">
            {currentUser !== '' ? (
              <div className="navbar-nav ml-auto">
                <li className="nav-item">
                  <Link to={'/profile'} className="nav-link">
                    {localStorage.username}
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to={`${USER_URL}search`} className="nav-link">
                    {t('common.text.searchuser')}
                  </Link>
                </li>
                <li className="nav-item">
                  <a
                    onClick={() => {
                      localStorage.jwt = ''
                    }}
                    href="/login"
                    className="nav-link"
                  >
                    {t('common.text.logout')}
                  </a>
                </li>
              </div>
            ) : (
              <div className="navbar-nav ml-auto">
                <li className="nav-item">
                  <Link to={'/login'} className="nav-link">
                    {t('common.text.login')}
                  </Link>
                </li>

                <li className="nav-item">
                  <Link to={'/register'} className="nav-link">
                    {t('common.text.signup')}
                  </Link>
                </li>
              </div>
            )}
          </nav>
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route exact path="/home" element={<Home />} />
            <Route exact path="/login" element={<Login />} />
            <Route exact path="/register" element={<Register />} />
            <Route exact path="/forgot" element={<ForgotPassword />} />
            <Route exact path="/signup" element={<SignUp />} />
            {currentUser !== '' ? (
              <>
                <Route exact path="/profile" element={<Profile />} />
                <Route exact path="/user/search" element={<SearchUser />} />
                <Route
                  exact
                  path="/user/detail/:user_id"
                  element={<ViewUserDetail />}
                />
                <Route
                  exact
                  path="/user/updated/:user_id"
                  element={<UpdatedUser />}
                />
                <Route exact path="/user/added" element={<AddedUser />} />
              </>
            ) : (
              <></>
            )}
          </Routes>
        </BrowserRouter>
      </div>
    </div>
  )
}

export default withTranslation()(App)
