import './App.css';
import styles from './App.module.css';
import { useState, useEffect, useMemo, useCallback } from 'react';
import { Layout, ConfigProvider } from 'antd';
import { BrowserRouter as Router } from 'react-router-dom';
import Sidebar from '../../ui/sidebar';
import I18nProvider from '../../i18n';
import { lightTheme, darkTheme, ThemeProvider } from '../../themes';
import ErrorBoundary from '../../ErrorBoundary'; // Импортируем компонент границы ошибок

import { AppContent } from "../view/AppContent/AppContent";
import { AppLayout } from '../view/AppLayout/AppLayout';

import * as deviceDetect from 'react-device-detect';
import { DeviceDetectProvider } from '../../providers'

import ruRU from 'antd/locale/ru_RU';
import enGB from 'antd/locale/en_GB';

export const App = () => {
  const getSystemTheme = useCallback(() => window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches, []);
  const getSystemLocale = useCallback(() => navigator.language.slice(0, 2), []);

  const savedTheme = useMemo(() => localStorage.getItem('theme'), []);
  const savedLocale = useMemo(() => localStorage.getItem('locale'), []);

  const [collapsed, setCollapsed] = useState(false);
  const [theme, setTheme] = useState(() => {
    const savedTheme = localStorage.getItem('theme');
    return savedTheme === 'dark' ? darkTheme : lightTheme;
  });

  const [locale, setLocale] = useState(() => {
    const savedLocale = localStorage.getItem('locale');
    return savedLocale || getSystemLocale();
  });


  useEffect(() => {
    if (!savedTheme) {
      const systemTheme = getSystemTheme() ? darkTheme : lightTheme;
      setTheme(systemTheme);
      localStorage.setItem('theme', systemTheme === darkTheme ? 'dark' : 'light');
    }
    if (!savedLocale) {
      const systemLocale = getSystemLocale();
      setLocale(systemLocale);
      localStorage.setItem('locale', systemLocale);
    }
  }, [getSystemTheme, getSystemLocale, savedTheme, savedLocale]);


  const toggle = useCallback(() => {
    setCollapsed(prev => !prev);
  }, []);

  const toggleTheme = useCallback(() => {
    const newTheme = theme === lightTheme ? darkTheme : lightTheme;
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme === lightTheme ? 'light' : 'dark');
  }, [theme]);

  const toggleLocale = useCallback(() => {
    const newLocale = locale === 'en' ? 'ru' : 'en';
    setLocale(newLocale);
    localStorage.setItem('locale', newLocale);
  }, [locale]);


  return (
    <I18nProvider locale={locale}>
      <ThemeProvider value={theme}>
        <ConfigProvider theme={theme} locale={locale === "ru" ? ruRU : enGB}>
          <DeviceDetectProvider deviceDetect={deviceDetect}>
            <Router>
              <AppLayout
                collapsed={collapsed}
                toggle={toggle}
                toggleTheme={toggleTheme}
                theme={theme}
                locale={locale}
                toggleLocale={toggleLocale}
              >
                <ErrorBoundary>
                  <AppContent collapsed={collapsed} />
                </ErrorBoundary>
              </AppLayout>
            </Router>
          </DeviceDetectProvider>
        </ConfigProvider>
      </ThemeProvider>
    </I18nProvider>
  );
}