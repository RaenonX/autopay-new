import axios, {AxiosResponse} from 'axios';
import {validate} from 'jsonschema';
import requestIp from 'request-ip';

import {ApiRequestSchema} from './schema/apiRequest';
import {ApiResponseSchema} from './schema/apiResponse';
import {requestSchema, RequestSchema} from './schema/request';
import {ResponseSchema} from './schema/response';
import {makeApiRequestBody} from './utils';
import {recordPendingTxN} from '../../controller/pending/main';
import {API_PATH_REQUEST} from '../../env';
import {PaymentType} from '../../types';
import {apiTimestampToDate} from '../../utils/date';
import {NextApiRoute} from '../types';


const payTypeMapping: {[source in ApiRequestSchema['payType']]: PaymentType} = {
  2: 'CVS',
};

export const apiRouteRequest: NextApiRoute<RequestSchema, ResponseSchema> = async (
  request,
  reply,
) => {
  validate(request.body, requestSchema, {throwAll: true});

  if (request.method !== 'POST') {
    reply.status(405).send({
      success: false,
      message: 'Only POST is allowed',
    });
    return;
  }

  const originIp = requestIp.getClientIp(request);

  if (!originIp) {
    reply.status(400).send({
      success: false,
      message: 'Unable to obtain request source IP.',
    });

    return;
  }

  const apiRequest = makeApiRequestBody(request.body, originIp);
  const response = await axios.post<ApiRequestSchema, AxiosResponse<ApiResponseSchema>>(
    API_PATH_REQUEST,
    apiRequest,
  );

  const code = response.data.code;

  if (code === -1) {
    // API Failed
    reply.status(400).send({
      success: false,
      message: response.data.msg,
    });

    return;
  }

  const {mobile, accountId} = request.body;
  const {orderNo, sign, bizAmt, notes, payType} = apiRequest;

  await recordPendingTxN({
    orderNo,
    accountId,
    signature: sign,
    tsCreated: apiTimestampToDate(apiRequest.date),
    orderAmount: bizAmt,
    originIp,
    mobile,
    note: notes || '',
    paymentType: payTypeMapping[payType],
  });

  reply.send({
    success: true,
    orderNo,
    url: response.data.detail.PayURL,
  });
};
