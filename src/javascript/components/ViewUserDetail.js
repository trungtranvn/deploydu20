import React, { useState } from 'react'
import '../css/ViewUserDetail.css'
import UserInforTab from './UserInforTab'
import UserPermissionTab from './UserPermissionTab'
import { withTranslation } from 'react-i18next'
function ViewUserDetail(props) {
  const [activeTab, setActiveTab] = useState('information')
  const { t } = props
  const handleInformationTab = () => {
    setActiveTab('information')
  }
  const handlePermissionTab = () => {
    setActiveTab('permission')
  }
  return (
    <div className="main">
      <h1>{t('common.text.viewUserDetail')}</h1>
      <div className="userDetail">
        <ul className="tab">
          <li
            className={activeTab === 'information' ? 'active' : ''}
            onClick={handleInformationTab}
          >
            {t('common.text.information')}
          </li>
          <li
            className={activeTab === 'permission' ? 'active' : ''}
            onClick={handlePermissionTab}
          >
            {t('common.text.permission')}
          </li>
        </ul>
        <div className="content">
          {activeTab === 'information' ? (
            <UserInforTab />
          ) : (
            <UserPermissionTab />
          )}
        </div>
      </div>
    </div>
  )
}

export default withTranslation()(ViewUserDetail)
