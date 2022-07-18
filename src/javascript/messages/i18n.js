import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import detector from 'i18next-browser-languagedetector'
import messageEN from './message_en.json'
import messageVN from './message_vn.json'

const resources = {
  en: {
    translation: messageEN,
  },
  vn: {
    translation: messageVN,
  },
}

i18n
  .use(detector)
  .use(initReactI18next)
  .init({
    resources: resources,
    lng: 'en',
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
  })
export default i18n
