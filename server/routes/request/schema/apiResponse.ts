import {asConst, FromSchema} from 'json-schema-to-ts';


export const apiResponseSchema = asConst({
  oneOf: [
    {
      type: 'object',
      properties: {
        code: {
          title: 'Response Code',
          description: 'Success response code (0).',
          const: 0,
        },
        detail: {
          title: 'Order Detail',
          description: 'Order detail redirection URL / HTML.',
          type: 'object',
          properties: {
            PayURL: {
              title: 'Order URL',
              description: 'Payment URL of the order.',
              type: 'string',
              format: 'uri',
            },
            PayHtml: {
              title: 'Order HTML',
              description: 'HTML containing the payment URL of the order.',
              type: 'string',
            },
          },
          required: [
            'PayURL',
            'PayHtml',
          ],
          additionalProperties: false,
        },
      },
      required: [
        'code',
        'detail',
      ],
      additionalProperties: false,
    },
    {
      type: 'object',
      properties: {
        code: {
          title: 'Response Code',
          description: 'Failure response code (-1).',
          const: -1,
        },
        msg: {
          title: 'Message',
          description: 'Error message. Only available on request failed.',
          type: 'string',
        },
      },
      required: [
        'code',
        'msg',
      ],
      additionalProperties: false,
    },
  ],
});

export type ApiResponseSchema = FromSchema<typeof apiResponseSchema>;
