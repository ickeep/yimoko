
export type ISize = 'mini' | 'small' | 'normal' | 'large';

export type ILayout = 'vertical' | 'horizontal';

export type IStatus = 'info' | 'success' | 'error' | 'warning' | 'loading';

export type IType = 'default' | 'primary' | 'info' | 'success' | 'warning' | 'danger';

// export const getColorByStatus = (status?: IStatus): IColor => {
//   const colorMap: Record<IStatus, IColor> = {
//     info: 'primary',
//     success: 'success',
//     error: 'danger',
//     warning: 'warning',
//     loading: 'primary',
//   };
//   return status ? colorMap[status] : 'default';
// };

// export const upSize = (size?: ISize): ISize => {
//   if (!size) return 'large';
//   const sizeMap: Record<ISize, ISize> = {
//     'extra-small': 'small',
//     small: 'medium',
//     medium: 'large',
//     large: 'extra-large',
//     'extra-large': 'extra-large',
//   };
//   return sizeMap[size];
// };

// export const downSize = (size?: ISize): ISize => {
//   if (!size) return 'small';
//   const sizeMap: Record<ISize, ISize> = {
//     'extra-small': 'extra-small',
//     small: 'extra-small',
//     medium: 'small',
//     large: 'medium',
//     'extra-large': 'large',
//   };
//   return sizeMap[size];
// };
