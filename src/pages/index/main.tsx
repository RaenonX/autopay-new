import React from 'react';

import axios, {AxiosResponse} from 'axios';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

import {OrderData} from './type';
import {RequestSchema} from '../../../server/routes/request/schema/request';
import {ResponseSchema} from '../../../server/routes/request/schema/response';
import {FloatingInput} from '../../components/common/form/floating/input';
import {TextWithLoading} from '../../components/common/loading/loading/text';
import {AjaxForm} from '../../components/form/main';
import {API_REQUEST} from '../../const';


const AMOUNT_MINIMUM = 200;

export const Main = () => {
  const [data, setData] = React.useState<OrderData>({
    disabled: false,
    error: '',
    amount: AMOUNT_MINIMUM,
    accountId: '',
    mobile: '',
  });

  const {amount, mobile, accountId, disabled} = data;
  const isAmountValid = amount >= AMOUNT_MINIMUM;
  const isAccountIdValid = !!accountId;
  const isMobileValid = mobile.length === 10;
  const isSubmitDisabled = !isMobileValid || !isAccountIdValid || !isAmountValid || disabled;

  const onSubmit = async () => {
    const response = await axios.post<RequestSchema, AxiosResponse<ResponseSchema>>(
      API_REQUEST,
      {amount, mobile, accountId},
    );

    if (response.data.success) {
      const {url} = response.data;
      window.open(url, '_blank');
    } else {
      setData({...data, error: response.data.message});
    }
  };

  return (
    <Row className="h-100">
      <Col xs={1} md={3}/>
      <Col xs={10} md={6} className="align-self-center">
        <AjaxForm data={data} setData={setData} onSubmit={onSubmit}>
          <FloatingInput
            type="number"
            min={AMOUNT_MINIMUM}
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
            label="帳號 ID"
            value={accountId}
            className="mb-3"
            onChange={({target}) => setData({
              ...data,
              accountId: target.value || '',
            })}
            isInvalid={!isAccountIdValid}
            feedbackOnInvalid="請輸入帳號 ID。注意，這並非您的遊戲名稱。"
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
