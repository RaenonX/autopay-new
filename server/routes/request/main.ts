import axios, {AxiosResponse} from 'axios';
import {validate} from 'jsonschema';
import requestIp from 'request-ip';


import {ApiRequestSchema} from './schema/apiRequest';
import {ApiResponseSchema} from './schema/apiResponse';
import {requestSchema, RequestSchema} from './schema/request';
import {ResponseSchema} from './schema/response';
import {makeApiRequestBody} from './utils';
import {API_PATH_REQUEST} from '../../env';
import {NextApiRoute} from '../types';


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

  const response = await axios.post<ApiRequestSchema, AxiosResponse<ApiResponseSchema>>(
    API_PATH_REQUEST,
    makeApiRequestBody(
      request.body,
      requestIp.getClientIp(request),
    ),
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

  reply.send({
    success: true,
    url: response.data.detail.PayURL,
  });
};
