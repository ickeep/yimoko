import { Form } from '@formily/core';
import { useForm } from '@formily/react';

export const useCurForm = <T extends object = any>(form?: Form<T>) => {
  const curForm = useForm<T>() as Form<T> | undefined;
  return form ?? curForm;
};
