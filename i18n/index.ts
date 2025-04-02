import { Platform } from 'react-native';
import i18n, { type LanguageDetectorAsyncModule, Resource } from 'i18next';
import { initReactI18next } from 'react-i18next';
import { getLocales } from 'expo-localization';
import AsyncStorage from '@react-native-async-storage/async-storage';

import en from './locales/en.json';
import zh from './locales/zh.json';
import zhCN from './locales/zh-CN.json';
import zhTW from './locales/zh-TW.json';

const resources: Resource = {
  en: {
    translation: en,
  },
  zh: {
    translation: zh,
  },
  'zh-CN': {
    translation: zhCN,
  },
  'zh-TW': {
    translation: zhTW,
  },
};
const languageDetector: LanguageDetectorAsyncModule = {
  type: 'languageDetector',
  async: true,
  init: () => {},
  detect: async (callback) => {
    try {
      if (Platform.OS === 'web') {
        if (typeof localStorage !== 'undefined') {
          const savedLanguage = localStorage.getItem('user-language');
          if (savedLanguage) {
            callback(savedLanguage);
            return;
          }
          const deviceLanguage = getLocales()[0].languageTag;
          callback(deviceLanguage);
          return deviceLanguage;
        }
      } else {
        const savedLanguage = await AsyncStorage.getItem('user-language');
        if (savedLanguage) {
          callback(savedLanguage);
          return;
        }
        const deviceLanguage = getLocales()[0].languageTag;
        callback(deviceLanguage);
        return deviceLanguage;
      }
    } catch (e) {
      console.error('Error detecting language', e);
      callback('en');
      return 'en';
    }
  },
  cacheUserLanguage: (lng: string) => {
    if (Platform.OS === 'web') {
      if (typeof localStorage !== 'undefined') {
        localStorage.setItem('user-language', lng);
      }
    } else {
      AsyncStorage.setItem('user-language', lng).catch(console.error);
    }
  },
};

i18n
  .use(languageDetector)
  .use(initReactI18next)
  .init({
    resources,
    // lng: 'en',
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false, // React Native不需要转义HTML
    },
  });

export default i18n;
