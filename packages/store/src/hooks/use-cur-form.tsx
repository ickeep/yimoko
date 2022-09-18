import { Form } from '@formily/core';
import { useForm } from '@formily/react';

import { IStore } from '../store';

export const useCurForm = <T extends object = any>(form?: Form<T>, store?: IStore) => {
  const curForm = useForm<T>() as Form<T> | undefined;
  return form ?? store?.form ?? curForm;
};
