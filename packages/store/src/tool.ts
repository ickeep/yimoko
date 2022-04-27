import { isEmpty, isNumber } from 'lodash-es';

export const getIsEmpty = (value: any) => (!isNumber(value) && isEmpty(value));
