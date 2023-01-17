import {validate} from 'jsonschema';

import {apiResponseSchema, ApiResponseSchema} from './schema';
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

  // TODO: Further actions on order completed
  console.log(`Order No. : ${request.body.orderNo}`);
  console.log(`Biz $     : ${request.body.bizAmt}`);
  console.log(`Status    : ${request.body.status}`);
  console.log(`Version   : ${request.body.version}`);
  console.log(`Date      : ${request.body.date}`);
  console.log(`Signature : ${request.body.sign}`);
  console.log(`Extra     : ${request.body.extra}`);

  // Required return by the API.
  reply.send('SUCCESS');
};
