export type ISize = 'small' | 'medium' | 'large';

export type Ilayout = 'vertical' | 'horizontal';

export type IStatus = 'info' | 'success' | 'error' | 'warning' | 'loading';

export type IColor = 'default' | 'primary' | 'success' | 'warning' | 'danger';


export const getColorByStatus = (status?: IStatus): IColor => {
  const colorMap: Record<IStatus, IColor> = {
    info: 'primary',
    success: 'success',
    error: 'danger',
    warning: 'warning',
    loading: 'primary',
  };
  return status ? colorMap[status] : 'default';
};


export const upSize = (size?: ISize): ISize => {
  if (!size) return 'large';
  const sizeMap: Record<ISize, ISize> = {
    small: 'medium',
    medium: 'large',
    large: 'large',
  };
  return sizeMap[size];
};

export const downSize = (size?: ISize): ISize => {
  if (!size) return 'small';
  const sizeMap: Record<ISize, ISize> = {
    small: 'small',
    medium: 'small',
    large: 'medium',
  };
  return sizeMap[size];
};
