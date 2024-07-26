import React from 'react';
import { Breadcrumb } from 'antd';
import { HomeOutlined } from '@ant-design/icons';
import { useLocation, Link } from 'react-router-dom';
import { useIntl } from 'react-intl';
import { useTheme } from '../../themes';

const Breadcrumbs = () => {
  const theme = useTheme(); // Получите текущую тему
  const location = useLocation();
  const pathSnippets = location.pathname.split('/').filter((i) => i);
  const intl = useIntl();

  const breadcrumbItems = [
    {
      key: 'home',
      title: (
        <Link to="/" style={{ color: theme.token.colorTextSecondary }}>
          <HomeOutlined />
        </Link>
      ),
    },
    ...pathSnippets.map((snippet, index) => {
      const url = `/${pathSnippets.slice(0, index + 1).join('/')}`;
      return {
        key: url,
        title: <Link to={url} style={{ color: theme.token.colorTextSecondary }}>{intl.formatMessage({ id: `breadcrumb.${snippet}` })}</Link>,
      };
    }),
  ];

  return (
    <Breadcrumb items={breadcrumbItems} />
  );
};

export default Breadcrumbs;
