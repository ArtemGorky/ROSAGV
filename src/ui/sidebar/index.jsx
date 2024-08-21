import React from 'react';
import { Layout, Menu, Button } from 'antd';
import { Link, useLocation } from 'react-router-dom';
import logo from '../../../assets/AKLogo.svg';
import userPhoto from '../../../assets/userPhoto.png';
import { useIntl } from 'react-intl';
import UsageGuidePanel from './view/usage-guide-panel';
import {
  DashboardIcon,
  NotificationsIcon,
  ReportsIcon,
  MapIcon,
  SettingsIcon,
  HelpIcon,
  BugIcon,
  ScenesIcon,
  SidebarCloseIcon,
  SidebarOpenIcon,
  SupportIcon,
  ThemeIcon
} from '../../icons/Icons';
import { useTheme } from '../../themes';

const { Sider } = Layout;

const Sidebar = ({ collapsed, toggle, toggleTheme, locale, toggleLocale }) => {
  const theme = useTheme();
  const location = useLocation();
  const selectedKey = location.pathname;
  const intl = useIntl();

  const menuItems = [
    { key: '/', icon: <DashboardIcon />, id: 'menu.dashboard' },
    {
      key: '/scenes',
      icon: <ScenesIcon />,
      id: 'menu.scenes',
      children: [
        { key: '/scenes/cards-and-snapshots', id: 'menu.cardsAndSnapshots' },
        { key: '/scenes/parks-and-robots', id: 'menu.parksAndRobots' },
        { key: '/scenes/robots-tasks', id: 'menu.robotsTasks' },
      ],
    },
    { key: '/map', icon: <MapIcon />, id: 'menu.map' },
    { key: '/reports', icon: <ReportsIcon />, id: 'menu.reports' },
    { key: '/notifications', icon: <NotificationsIcon />, id: 'menu.notifications' },
  ];

  const supportItems = [
    { key: '/settings', icon: <SettingsIcon />, id: 'menu.settings' },
    { key: '/help', icon: <HelpIcon />, id: 'menu.help' },
    { key: '/bug-report', icon: <BugIcon />, id: 'menu.bugReport' },
    { key: '/support', icon: <SupportIcon />, id: 'menu.support' },
  ];

  return (
    <Sider
      trigger={null}
      collapsible
      collapsed={collapsed}
      theme={theme.sider}
      style={{
        height: '100vh',
        position: 'fixed',
        left: 0,
        top: 0,
        bottom: 0,
        backgroundColor: theme.token.colorBgContainer,
        color: theme.token.colorTextBase,
      }}
    >
      <div
        style={{
          display: 'flex',
          justifyContent: collapsed ? 'center' : 'flex-end',
          alignItems: 'center',
          padding: '16px',
        }}
      >
        <Button
          type="text"
          icon={collapsed ? <SidebarOpenIcon /> : <SidebarCloseIcon />}
          onClick={toggle}
          style={{ color: theme.token.colorTextSecondary, fontSize: '1.5em' }}
        />
      </div>
      <div className="logo" style={{ display: 'flex', alignItems: 'center', padding: '0 16px 16px' }}>
        <img src={logo} className="logo-img" alt="App logo" style={{ height: '32px', marginRight: '8px' }} />
        {!collapsed && (
          <span style={{ color: theme.token.colorTextBase, fontSize: '24px', fontWeight: 'bold'  }}>
            {intl.formatMessage({ id: 'app.title' })}
          </span>
        )}
      </div>
      <Menu
        theme={theme.sider}
        mode="inline"
        selectedKeys={[selectedKey]}
        items={menuItems.map(item => ({
          key: item.key,
          icon: item.icon,
          label: <Link to={item.key} style={{ color: theme.token.colorTextBase }}>{intl.formatMessage({ id: item.id })}</Link>,
          children: item.children && item.children.map(child => ({
            key: child.key,
            label: <Link to={child.key} style={{ color: theme.token.colorTextBase }}>{intl.formatMessage({ id: child.id })}</Link>,
          })),
        }))}
        style={{ backgroundColor: theme.token.colorBgContainer}}
      />
      <Menu
        theme={theme.sider}
        mode="inline"
        selectedKeys={[selectedKey]}
        items={supportItems.map(item => ({
          key: item.key,
          icon: item.icon,
          label: <Link to={item.key} style={{ color: theme.token.colorTextBase }}>{intl.formatMessage({ id: item.id })}</Link>,
        }))}
        style={{ position: 'absolute', bottom: '150px', width: '100%', backgroundColor: theme.token.colorBgContainer, borderBottom: `1px solid ${theme.token.colorTextSecondary}`, borderTop: `1px solid ${theme.token.colorTextSecondary}` }}
      />
      <div
        style={{
          position: 'absolute',
          bottom: '10px',
          width: '100%',
          textAlign: 'center',
          display: 'flex',
          flexDirection: 'column',
          alignItems: collapsed ? 'center' : 'flex-start',
        }}
      >
        {!collapsed ? (
          <>
            <UsageGuidePanel theme={theme} />
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%', padding: '0 16px' }}>
              <Link to="/account">
                <img src={userPhoto} alt="User" style={{ borderRadius: '50%', width: '50px', height: '50px' }} />
              </Link>
              <div style={{ display: 'flex', alignItems: 'center'}}>
                <Button
                  type="text"
                  icon={<ThemeIcon />}
                  onClick={toggleTheme}
                  style={{ color: theme.token.colorTextSecondary }}
                />
                <Button
                  type="text"
                  onClick={toggleLocale}
                  style={{ color: theme.token.colorTextSecondary }}
                >
                  {locale === 'en' ? 'RU' : 'EN'}
                </Button>
              </div>
            </div>
          </>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Button
              type="text"
              icon={<ThemeIcon />}
              onClick={toggleTheme}
              style={{ color: theme.token.colorTextSecondary }}
            />
            <Button
              type="text"
              onClick={toggleLocale}
              style={{ color: theme.token.colorTextSecondary }}
            >
              {locale === 'en' ? 'RU' : 'EN'}
            </Button>
            <Link to="/account">
              <img src={userPhoto} alt="User" style={{ borderRadius: '50%', width: '50px', height: '50px', marginTop: '8px' }} />
            </Link>
          </div>
        )}
      </div>
    </Sider>
  );
};

export default Sidebar;
