import { Layout, Drawer, Button, Menu } from 'antd';
import { ReactNode, useState } from 'react';

import logo from '@/shared/assets/AKLogo.svg';
import userPhoto from '@/shared/assets/userPhoto.png';

import styles from "./MobileDrawer.module.css";
import { Link, useLocation } from 'react-router-dom';
import { useIntl } from 'react-intl';

import UsageGuidePanel from '@/ui/sidebar/view/usage-guide-panel';

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
} from '@/icons/Icons';

type Props = {
    children: ReactNode;
    collapsed: boolean;
    theme: any;
    toggleTheme: () => void;
    toggleLocale: () => void;
    locale: string;
    themeStyles: any;
}

export const MobileDrawer = ({ children, collapsed, theme, toggleTheme, toggleLocale, locale, themeStyles }: Props) => {

    const location = useLocation();
    const selectedKey = location.pathname;
    const intl = useIntl();

    const [open, setOpen] = useState(false);

    const savedTheme = localStorage.getItem('theme');

    const showDrawer = () => {
        setOpen(true);
    };

    const onClose = () => {
        setOpen(false);
    };

    const supportItems = [
        { key: '/settings', icon: <SettingsIcon />, id: 'menu.settings' },
        { key: '/help', icon: <HelpIcon />, id: 'menu.help' },
        { key: '/bug-report', icon: <BugIcon />, id: 'menu.bugReport' },
        { key: '/support', icon: <SupportIcon />, id: 'menu.support' },
    ];

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
                { key: '/scenes/robots-info', id: 'menu.robotsInfo' },
                { key: '/scenes/robots-history', id: 'menu.robotsHistory' },
                // { key: '/scenes/tasks-errors', id: 'menu.tasksErrors' },
            ],
        },
        { key: '/map', icon: <MapIcon />, id: 'menu.map' },
        { key: '/reports', icon: <ReportsIcon />, id: 'menu.reports' },
        { key: '/notifications', icon: <NotificationsIcon />, id: 'menu.notifications' },
    ];

    return (
        <Layout
            className={
                savedTheme === 'dark'
                    ? styles.darkLayout
                    : styles.layout
            }
            style={{ backgroundColor: theme.token.colorBgBase }}
        >
            <Button
                type="text"
                icon={collapsed ? <SidebarOpenIcon /> : <SidebarCloseIcon />}
                onClick={showDrawer}
                style={{
                    color: theme.token.colorTextSecondary,
                    fontSize: '1.5em',
                    position: "absolute",
                    right: 0,
                    margin: "10px"
                }}
            />
            <Drawer
                closeIcon={<div style={{ marginTop: "3px" }}>
                    <SidebarOpenIcon
                        type="text"
                        style={{ color: theme.token.colorTextSecondary }}
                    />
                </div>}
                onClose={onClose}
                open={open}
                className={styles.drawer}
                width={"auto"}
            >
                <div>
                    <div className="logo" style={{ display: 'flex', alignItems: 'center', padding: '0 16px 16px' }}>
                        <img src={logo} className="logo-img" alt="App logo" style={{ height: '32px', marginRight: '8px' }} />
                        {!collapsed && (
                            <span style={{ color: theme.token.colorTextBase, fontSize: '24px', fontWeight: 'bold' }}>
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
                        style={{ backgroundColor: theme.token.colorBgContainer }}
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
                        style={{ marginTop: "16px", width: '100%', backgroundColor: theme.token.colorBgContainer, borderBottom: `1px solid ${theme.token.colorTextSecondary}`, borderTop: `1px solid ${theme.token.colorTextSecondary}` }}
                    />
                    <div
                        style={{
                            width: '100%',
                            textAlign: 'center',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: "center",
                            marginTop: "16px"
                        }}
                    >
                        {!collapsed ? (
                            <>
                                <div
                                    style={{
                                        width: "100%",
                                        display: "flex",
                                        justifyContent: "center",
                                    }}
                                >
                                    <UsageGuidePanel theme={theme} />
                                </div>
                                <div style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'space-between',
                                    width: '100%',
                                    padding: '0 16px'
                                }}>
                                    <Link to="/account">
                                        <img src={userPhoto} alt="User" style={{ borderRadius: '50%', width: '50px', height: '50px' }} />
                                    </Link>
                                    <div style={{ width: "40%", display: 'flex', alignItems: 'center' }}>
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
                                    <img src={userPhoto} alt="User" style={{ borderRadius: '50%', width: '50px', height: '50px' }} />
                                </Link>
                            </div>
                        )}
                    </div>
                </div>
            </Drawer>
            <Layout style={{ ...themeStyles, marginLeft: 0 }}>
                {children}
            </Layout>
        </Layout>
    )
}