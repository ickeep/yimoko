import { ThemeStore } from '@yimoko/store';

export const defaultTheme = {
  primaryColor: '#1890ff',
  successColor: '#52c41a',
  warningColor: '#faad14',
  errorColor: '#f5222d',
  fontSizeBase: 28,
  headingColor: 'rgba(0, 0, 0, 0.85)',
  textColor: 'rgba(0, 0, 0, 0.65)',
  textColorSecondary: 'rgba(0, 0, 0, 0.45)',
  disabledColor: 'rgba(0, 0, 0, 0.25)',
  borderColor: '#d9d9d9',
  borderColorSecondary: '#e8e8e8',
  borderRadiusBase: '4px',
  borderRadiusTiny: '2px',
  borderRadiusSmall: '4px',
  borderRadiusMedium: '8px',
  borderRadiusLarge: '16px',
  borderRadiusHuge: '32px',
  borderWidthBase: '1px',
  borderWidthTiny: '1px',
  borderWidthSmall: '2px',
  borderWidthMedium: '4px',
  borderWidthLarge: '8px',
  borderWidthHuge: '16px',
  boxShadowBase: '0 2px 8px rgba(0, 0, 0, 0.15)',
  boxShadowTiny: '0 2px 8px rgba(0, 0, 0, 0.05)',
  boxShadowSmall: '0 2px 8px rgba(0, 0, 0, 0.05)',
  boxShadowMedium: '0 2px 8px rgba(0, 0, 0, 0.1)',

  iconSizeSmall: 24,
  iconSizeMedium: 28,
  iconSizeLarge: 32,
};

export const themeStore: ThemeStore<typeof defaultTheme> = new ThemeStore(defaultTheme);

// 以便扩展
export const useTheme = () => themeStore.theme;
