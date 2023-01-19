import {validate} from 'jsonschema';

import {apiResponseSchema, ApiResponseSchema} from './schema';
import {recordCompletedTxN} from '../../controller/completed/main';
import {apiTimestampToDate} from '../../utils/date';
import {NextApiRoute} from '../types';


export const apiRouteCallback: NextApiRoute<ApiResponseSchema, string> = async (
  request,
  reply,
) => {
  validate(request.body, apiResponseSchema, {throwAll: true});

  if (request.method !== 'POST') {
    reply.status(405).send('Only POST is allowed');
    return;
  }

  const {orderNo, sign, date, bizAmt, extra} = request.body;

  await recordCompletedTxN({
    orderNo,
    signature: sign,
    tsCompleted: apiTimestampToDate(date),
    paidAmount: bizAmt,
    message: extra || '',
  });

  // Required return by the API.
  reply.send('SUCCESS');
};
