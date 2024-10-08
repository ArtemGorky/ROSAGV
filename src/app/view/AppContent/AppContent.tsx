import { memo } from 'react';

import { Route, Routes, useLocation, Navigate } from 'react-router-dom';
import { Layout } from 'antd';

import Dashboard from '@/pages/dashboard';
import Scenes from '@/pages/scenes';
import Map from '@/pages/map';
import Reports from '@/pages/reports';
import Notifications from '@/pages/notifications';
import CardsAndSnapshots from '@/pages/cards-and-snapchots';
import ParksAndRobots from '@/pages/parks-and-robots';
import RobotsTasks from '@/pages/robots-tasks';
import RobotsTargetTask from '@/pages/robots-target-task';
import Settings from '@/pages/settings';
import Help from '@/pages/help';
import BugReport from '@/pages/bug-report';
import Support from '@/pages/support';
import Account from '@/pages/account';
import UsageGuide from '@/pages/usage-guide';
import Breadcrumbs from '@/ui/breadcrumbs';

import styles from './AppContent.module.css';

const { Content } = Layout;

export const AppContent = memo(({ collapsed }: { collapsed: boolean }) => {
    const location = useLocation();
    const isMapPage = location.pathname === '/map';

    return (
        <Content
            className={styles["site-layout-background"]}    
            style={{
                padding: isMapPage ? '0' : '16px',
                backgroundColor: isMapPage ? 'inherit' : 'transparent',
                color: isMapPage ? 'inherit' : 'transparent',
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
                <Route path="/scenes/tasks-errors" element={<RobotsTargetTask />} />
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