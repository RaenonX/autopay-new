import React from 'react';

import {ErrorProps} from 'next/error';
import Alert from 'react-bootstrap/Alert';


export const CustomErrorPage = ({statusCode, title}: ErrorProps) => {
  return (
    <Alert variant="danger">
      <Alert.Heading>錯誤</Alert.Heading>
      <p className="mb-0">
        {`HTTP 錯誤碼: ${statusCode}`}
      </p>
      {
        title &&
        <>
          <hr/>
          <p className="mb-0">
            {`訊息: ${title}`}
          </p>
        </>
      }
    </Alert>
  );
};
