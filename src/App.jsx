import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { Layout, ConfigProvider } from 'antd';
import { BrowserRouter as Router, Route, Routes, useLocation, Navigate } from 'react-router-dom';
import Sidebar from './ui/sidebar';
import Dashboard from './pages/dashboard';
import Scenes from './pages/scenes';
import Map from './pages/map';
import Reports from './pages/reports';
import Notifications from './pages/notifications';
import CardsAndSnapshots from './pages/cards-and-snapchots';
import ParksAndRobots from './pages/parks-and-robots';
import RobotsTasks from './pages/robots-tasks';
import RobotsTargetTask from './pages/robots-target-task';
import Settings from './pages/settings';
import Help from './pages/help';
import BugReport from './pages/bug-report';
import Support from './pages/support';
import Account from './pages/account';
import UsageGuide from './pages/usage-guide';
import Breadcrumbs from './ui/breadcrumbs';
import I18nProvider from './i18n';
import { lightTheme, darkTheme, ThemeProvider } from './themes';
import './App.css';
import ErrorBoundary from './ErrorBoundary'; // Импортируем компонент границы ошибок

import ruRU from 'antd/locale/ru_RU';
import enGB from 'antd/locale/en_GB';

const { Content } = Layout;

const AppContent = React.memo(({ collapsed }) => {
  const location = useLocation();
  const isMapPage = location.pathname === '/map';

  return (
    <Content
      className="site-layout-background"
      style={{
        padding: isMapPage ? '0' : '16px',
        boxSizing: 'border-box',
        height: '100%',
        backgroundColor: isMapPage ? 'inherit' : undefined,
        color: isMapPage ? 'inherit' : undefined,
      }}
    >
      {!isMapPage && <Breadcrumbs />}
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/scenes" element={<Scenes />} />
        <Route path="/scenes/cards-and-snapshots" element={<CardsAndSnapshots />} />
        <Route path="/scenes/parks-and-robots" element={<ParksAndRobots />} />
        <Route path="/scenes/robots-tasks" element={<RobotsTasks />} />
        <Route path="/scenes/robots-tasks/task" element={<RobotsTargetTask />} />
        <Route path="/map" element={<Map collapsed={collapsed} />} />
        <Route path="/reports" element={<Reports />} />
        <Route path="/notifications" element={<Notifications />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/help" element={<Help />} />
        <Route path="/bug-report" element={<BugReport />} />
        <Route path="/support" element={<Support />} />
        <Route path="/usage-guide" element={<UsageGuide />} />
        <Route path="/account" element={<Account />} />
        <Route path="*" element={<Navigate to="/" replace />} /> {/* Обработка 404 страниц */}
      </Routes>
    </Content>
  );
});

function App() {
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

  const themeStyles = useMemo(() => ({
    marginLeft: collapsed ? 80 : 200,
    transition: 'margin-left 0.2s',
    overflow: 'auto',
    height: '100vh',
    backgroundColor: theme.token.colorBgBase,
    color: theme.token.colorTextBase,
  }), [collapsed, theme.token.colorBgBase, theme.token.colorTextBase]);
  
  return (
    <I18nProvider locale={locale}>
      <ThemeProvider value={theme}>
        <ConfigProvider theme={theme} locale={locale === "ru" ? ruRU : enGB}>
          <Router>
            <Layout style={{ minHeight: '100vh', overflow: 'hidden', backgroundColor: theme.token.colorBgBase }}>
              <Sidebar
                collapsed={collapsed}
                toggle={toggle}
                toggleTheme={toggleTheme}
                theme={theme.sider}
                locale={locale}
                toggleLocale={toggleLocale}
              />
              <Layout className="site-layout" style={themeStyles}>
                <ErrorBoundary>
                  <AppContent collapsed={collapsed} />
                </ErrorBoundary>
              </Layout>
            </Layout>
          </Router>
        </ConfigProvider>
      </ThemeProvider>
    </I18nProvider>
  );
}

export default App;
