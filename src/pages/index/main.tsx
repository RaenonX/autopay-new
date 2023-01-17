import React from 'react';

import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

import {OrderData} from './type';
import {FloatingInput} from '../../components/common/form/floating/input';
import {TextWithLoading} from '../../components/common/loading/loading/text';
import {AjaxForm} from '../../components/form/main';


const AMOUNT_MINIMUM = 500;

export const Main = () => {
  const [data, setData] = React.useState<OrderData>({
    disabled: false,
    error: '',
    amount: AMOUNT_MINIMUM,
    mobile: '',
    name: '',
  });

  const {amount, mobile, name, disabled} = data;
  const isAmountValid = amount >= AMOUNT_MINIMUM;
  const isNameValid = !!name;
  const isMobileValid = mobile.length === 10;
  const isSubmitDisabled = !isMobileValid || !isNameValid || !isAmountValid;

  const onSubmit = async () => {
    console.log(window.location.hostname);
  };

  return (
    <Row>
      <Col xs={1} md={3}/>
      <Col xs={10} md={6}>
        <AjaxForm data={data} setData={setData} onSubmit={onSubmit}>
          <FloatingInput
            type="number"
            min={500}
            label="金額"
            value={amount}
            className="mb-3"
            onChange={({target}) => {
              if (target.value !== '' && (isNaN(+target.value))) {
                return;
              }

              setData({...data, amount: parseInt(target.value)});
            }}
            isInvalid={!isAmountValid}
            feedbackOnInvalid={`金額不得小於 ${AMOUNT_MINIMUM}。`}
            required
          />
          <FloatingInput
            label="名稱"
            value={name}
            className="mb-3"
            onChange={({target}) => setData({
              ...data,
              name: target.value || '',
            })}
            isInvalid={!isNameValid}
            feedbackOnInvalid="請輸入名稱。"
            required
          />
          <FloatingInput
            label="手機"
            value={mobile}
            className="mb-3"
            onChange={({target}) => {
              if (target.value !== '' && (isNaN(+target.value))) {
                return;
              }

              setData({
                ...data,
                mobile: target.value || '',
              });
            }}
            isInvalid={!isMobileValid}
            feedbackOnInvalid="請輸入正確的手機號碼 (10 位數)。"
            required
          />
          <Button type="submit" className="w-100" variant="outline-warning" disabled={isSubmitDisabled}>
            <TextWithLoading show={disabled} text="產生訂單"/>
          </Button>
        </AjaxForm>
      </Col>
      <Col xs={1} md={3}/>
    </Row>
  );
};
