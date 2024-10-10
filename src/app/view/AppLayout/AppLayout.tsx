import { Layout } from 'antd';
import { ReactNode, useMemo } from 'react';
import Sidebar from '@/ui/sidebar';

import styles from './AppLayout.module.css';

import { useDeviceDetect } from "@/hooks";
import { MobileDrawer } from '@/ui/mobileDrawer';
type Props = {
    children: ReactNode;
    collapsed: boolean;
    toggle: () => void;
    toggleTheme: () => void;
    theme: any;
    locale: string;
    toggleLocale: () => void;
}

export const AppLayout = (
    { children, collapsed, toggle, toggleTheme, theme, locale, toggleLocale }: Props
) => {

    const { isMobile } = useDeviceDetect();

    const savedTheme = localStorage.getItem('theme');

    const themeStyles = useMemo(() => ({
        marginLeft: collapsed ? 80 : 200,
        transition: 'margin-left 0.2s',
        overflow: 'auto',
        height: '100vh',
        backgroundColor: theme.token.colorBgBase,
        color: theme.token.colorTextBase,
    }), [collapsed, theme.token.colorBgBase, theme.token.colorTextBase]);

    return (
        isMobile
            ? <MobileDrawer
                collapsed={collapsed}
                theme={theme}
                toggleTheme={toggleTheme}
                toggleLocale={toggleLocale}
                locale={locale}
                themeStyles={themeStyles}
            >
                {children}
            </MobileDrawer>
            : <Layout
                className={savedTheme === 'dark' ? styles.darkLayout : styles.layout}
                style={{ backgroundColor: theme.token.colorBgBase }}
            >
                <Sidebar
                    collapsed={collapsed}
                    toggle={toggle}
                    toggleTheme={toggleTheme}
                    theme={theme.sider}
                    locale={locale}
                    toggleLocale={toggleLocale}
                />
                <Layout style={themeStyles}>
                    {children}
                </Layout>
            </Layout>
    );
}