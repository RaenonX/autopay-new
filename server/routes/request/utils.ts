import crypto from 'crypto';

import {ApiRequestSchema, ApiRequestSchemaToSign} from './schema/apiRequest';
import {RequestSchema} from './schema/request';
import {API_CALLBACK_URL, API_MERCHANT_NO, API_REDIRECT_URL} from '../../env';
import {generateCurrentApiTimestamp} from '../../utils/date';
import {generateOrderSignature} from '../../utils/order';


export const makeApiRequestBody = (
  {amount, name, mobile}: RequestSchema,
  clientIp: string | null,
): ApiRequestSchema => {
  const notes = `Order IP: ${clientIp}`;
  const date = generateCurrentApiTimestamp();
  const orderNo = `${date}-${crypto.randomBytes(4).toString('hex')}`;

  const apiRequestToSign: ApiRequestSchemaToSign = {
    version: 'V3',
    signType: 'MD5',
    merchantNo: API_MERCHANT_NO,
    orderNo,
    bizAmt: amount,
    date: generateCurrentApiTimestamp(),
    payType: 2,
    noticeUrl: API_CALLBACK_URL,
    returnUrl: API_REDIRECT_URL,
    customName: name,
    mobile: mobile,
    notes,
  };

  return {
    ...apiRequestToSign,
    sign: generateOrderSignature(apiRequestToSign),
  };
};
