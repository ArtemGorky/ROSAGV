import { createContext, useContext } from 'react';


export const lightTheme = {
  token: {
    colorPrimary: '#C0C0C0',
    colorBgBase: '#ffffff',
    colorTextBase: '#000000',
    colorTextSecondary: '#6A728F',
    colorBgContainer: '#ffffff',
    colorLink: '#6A728F',
    colorPrimaryBg: '#ffffff',
    colorBgSecondary: '#C0C0C0',
    colorRoad: '#B0C4DE', 
    colorPoint: '#4682B4',
  },
  sider: 'light',
};

export const darkTheme = {
  token: {
    colorPrimary: '#2B3442',
    colorBgBase: '#171920',
    colorTextBase: '#DDE2E7',
    colorTextSecondary: '#6A728F',
    colorBgContainer: '#0C0F17',
    colorLink: '#6A728F',
    colorPrimaryBg: '#0C0F17',
    colorBgSecondary: '#2B3442',
    colorRoad: '#1B382E',
    colorPoint: '#1C2939',
  },
  sider: 'dark',
};


const ThemeContext = createContext();

export const ThemeProvider = ThemeContext.Provider;

export const useTheme = () => useContext(ThemeContext);
