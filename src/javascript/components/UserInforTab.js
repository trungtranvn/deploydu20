import React, { useState, useEffect } from 'react'
import { BACKEND_URL, USER_API, USER_URL, API, JWT_TYPE } from '../constant'
import { useParams } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { withTranslation } from 'react-i18next'
import Modal from 'react-modal'
import axios from 'axios'
import '../css/UserInforTab.css'
function UserInforTab(props) {
  const { t } = props
  const [user, setUser] = useState([])
  const [roles, setRoles] = useState('')
  const [modalIsOpenBtnDel, setIsOpenBtnDel] = useState(false)
  const [modalIsOpenBtnOk, setIsOpenBtnOk] = useState(false)
  let { user_id } = useParams()
  let navigate = useNavigate()
  const jwt = localStorage.getItem('jwt')

  useEffect(() => {
    const url = BACKEND_URL + API + USER_API + `/detail?userId=${user_id}`
    axios
      .get(url, { headers: { Authorization: JWT_TYPE + jwt } })
      .then((res) => {
        let rolesStr = ''
        setUser(res.data)
        for (var i = 0; i < res.data.roles.length; i++) {
          rolesStr += res.data.roles[i].roleName
          if (!(i === res.data.roles.length - 1)) {
            rolesStr += ', '
          }
        }
        setRoles(rolesStr)
      })
  }, [])
  function delUser() {
    const url = BACKEND_URL + API + USER_API + `/delete`
    var data = JSON.stringify(user_id)
    axios
      .delete(url, {
        headers: {
          Authorization: JWT_TYPE + jwt,
          'Content-Type': 'application/json',
        },
        data: data,
      })
      .then((res) => {
        setIsOpenBtnOk(true)
      })
  }
  function btnclose() {
    setIsOpenBtnDel(false)
  }
  function btnDel() {
    setIsOpenBtnDel(true)
  }
  function redirectSearch() {
    navigate(USER_URL + 'search')
  }
  function redirect() {
    navigate(USER_URL + 'updated/' + user_id)
  }
  const customStylesDel = {
    content: {
      top: '50%',
      left: '50%',
      background: '#fb7b5d',
      fontWeight: '400',
      fontSize: '40px',
      color: '#000000',
      borderRadius: '30px',
      width: '800px',
      height: '190px',
      padding: '50px',
      transform: 'translate(-50%, -50%)',
      textAlign: 'center',
    },
  }
  const customStylesBtnOk = {
    content: {
      top: '50%',
      left: '50%',
      background: '#fb7b5d',
      fontWeight: '400',
      fontSize: '40px',
      color: '#000000',
      borderRadius: '30px',
      width: '800px',
      height: '190px',
      padding: '50px',
      transform: 'translate(-50%, -50%)',
      textAlign: 'center',
    },
  }
  return (
    <div id="information" className="tabContent">
      <div className="column one">
        <img
          src={require(`../images/avatar/nvha.png`)}
          className="avatar"
          alt=""
        />
        <div className="groupButton">
          <button
            type="button"
            onClick={() => {
              redirect()
            }}
          >
            {t('common.text.edit')}
          </button>
          <button type="button" onClick={() => btnDel()}>
            {t('common.text.delete')}
          </button>
        </div>
      </div>
      <div className="column two">
        <div className="username">
          <label for="username">{t('common.text.username')}</label>
          <input
            className="inputView"
            type="text"
            value={user.username}
            disabled
            id="username"
            name="username"
          />
        </div>
        <div className="email">
          <label for="email">{t('common.text.email')}</label>
          <input
            className="inputView"
            type="text"
            value={user.email}
            disabled
            id="email"
            name="email"
          />
        </div>
        <div className="address">
          <label for="address">{t('common.text.address')}</label>
          <input
            className="inputView"
            type="text"
            value={user.address}
            disabled
            id="address"
            name="address"
          />
        </div>
        <div className="status">
          <label for="status">{t('common.text.status')}</label>
          <input
            className="inputView"
            type="text"
            value={user.status}
            disabled
            id="status"
            name="status"
          />
        </div>
      </div>
      <div className="column three">
        <div className="password">
          <label for="password">{t('common.text.password')}</label>
          <input
            className="inputView"
            type="password"
            value={user.password}
            disabled
            id="password"
            name="password"
          />
        </div>
        <div className="phone">
          <label for="phone">{t('common.text.phone')}</label>
          <input
            className="inputView"
            type="text"
            value={user.phone}
            disabled
            id="phone"
            name="phone"
          />
        </div>
        <div className="role">
          <label for="role">{t('common.text.role')}</label>
          <input
            className="inputView"
            type="text"
            value={roles}
            disabled
            id="role"
            name="role"
          />
        </div>
      </div>
      <Modal isOpen={modalIsOpenBtnDel} style={customStylesDel}>
        {t('common.text.suretodelete')}
        <div className="groupButtonDel">
          <button className="btnYes" onClick={() => delUser()}>
            {t('common.text.yes')}
          </button>
          <button className="btnNo" onClick={() => btnclose()}>
            {t('common.text.no')}
          </button>
        </div>
      </Modal>
      <Modal isOpen={modalIsOpenBtnOk} style={customStylesBtnOk}>
        {t('common.text.deleteusersuccesfully')}
        <div className="groupButtonDel">
          <button className="btnOk" onClick={() => redirectSearch()}>
            {t('common.text.btnok')}
          </button>
        </div>
      </Modal>
    </div>
  )
}

export default withTranslation()(UserInforTab)
