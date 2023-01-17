import React from 'react';

import Alert from 'react-bootstrap/Alert';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';


type Props = {
  error?: string,
};

export const AjaxFormError = ({error}: Props) => {
  if (!error) {
    return <></>;
  }

  return (
    <Row>
      <Col>
        <Alert variant="danger">
          {error}
        </Alert>
      </Col>
    </Row>
  );
};
