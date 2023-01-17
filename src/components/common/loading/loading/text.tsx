import React from 'react';

import Spinner from 'react-bootstrap/Spinner';


type Props = {
  show: boolean,
  text: string,
};

export const TextWithLoading = ({show, text}: Props) => {
  return <>{show && <><Spinner size="sm" animation="border"/>&nbsp;</>}{text}</>;
};
