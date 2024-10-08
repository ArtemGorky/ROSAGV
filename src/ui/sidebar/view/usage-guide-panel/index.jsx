import React from 'react';
import { Link } from 'react-router-dom';
import { QuestionCircleOutlined } from '@ant-design/icons';
import { useIntl } from 'react-intl';
import { useTheme } from '../../../../themes';

const UsageGuidePanel = () => {
  const intl = useIntl();
  const theme = useTheme(); 

  const containerStyle = {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: '10px',
    backgroundColor: theme.token.colorBgSecondary, 
    color: theme.token.colorTextBase,
    width: '180px',
    height: '60px',
    padding: '4px',
    textDecoration: 'none',
    // marginLeft: '10px',
    marginBottom: '15px'
  };

  const iconSegmentStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '40px',
    flexShrink: 0
  };

  const textSegmentStyle = {
    display: 'flex',
    alignItems: 'center',
    flexGrow: 1,
    textAlign: 'left'
  };

  return (
    <Link to="/usage-guide" style={containerStyle}>
      <div style={iconSegmentStyle}>
        <QuestionCircleOutlined style={{ fontSize: '20px', color: theme.token.colorTextBase }} />
      </div>
      <div style={textSegmentStyle}>
        {intl.formatMessage({ id: 'system.usageGuide' })}
      </div>
    </Link>
  );
};

export default UsageGuidePanel;
