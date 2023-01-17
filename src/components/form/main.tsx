import React, {FormEvent} from 'react';

import {AxiosResponse} from 'axios';
import Form from 'react-bootstrap/Form';

import {AjaxFormError} from './error';
import {AjaxFormData} from './type';
import {getErrorMessage} from '../../utils/error';


type Props<D extends AjaxFormData> = React.PropsWithChildren<{
  data: D,
  setData: React.Dispatch<React.SetStateAction<D>>,
  onSubmit: (e: FormEvent<HTMLFormElement>) => Promise<void>,
  getError?: (response: AxiosResponse) => string | null,
}>;

export const AjaxForm = <D extends AjaxFormData>({
  data, setData, onSubmit, getError, children,
}: Props<D>) => {
  const {error} = data;

  const onSubmitInternal = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setData({
      ...data,
      disabled: true,
      error: '',
    });

    try {
      await onSubmit(e);

      setData({
        ...data,
        disabled: false,
        error: '',
      });
    } catch (err) {
      setData({
        ...data,
        disabled: false,
        error: getErrorMessage({err, getAxiosError: getError}),
      });
    }
  };

  return (
    <Form onSubmit={onSubmitInternal} className="mb-3">
      <AjaxFormError error={error}/>
      {children}
    </Form>
  );
};
