import { isEmpty, isNumber } from 'lodash-es';

export const judgeIsEmpty = (value: any) => (!isNumber(value) && isEmpty(value));
