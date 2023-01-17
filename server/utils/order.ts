import crypto from 'crypto';

import {API_MERCHANT_CODE} from '../env';
import {ApiRequestSchemaToSign} from '../routes/request/schema/apiRequest';


export const generateOrderSignature = (request: ApiRequestSchemaToSign): string => {
  const {notes, mobile, ...signatureSource} = request;

  const signatureSourceStr = Object
    .keys(signatureSource)
    .sort()
    .map((key) => `${key}=${signatureSource[key as keyof typeof signatureSource]}`)
    .join('&');

  return crypto
    .createHash('md5')
    .update(`${signatureSourceStr}${API_MERCHANT_CODE}`)
    .digest('hex');
};
