import {asConst, FromSchema} from 'json-schema-to-ts';


export const apiResponseSchema = asConst({
  type: 'object',
  properties: {
    orderNo: {
      title: 'Order No.',
      description: 'Order number.',
      type: 'string',
    },
    bizAmt: {
      title: 'Amount',
      description: 'ACTUAL amount paid on the order.',
      type: 'number',
    },
    status: {
      title: 'Status',
      description: 'Order payment status. 1 = Success; 2 = Failure.',
      enum: [1, 2],
    },
    version: {
      title: 'Version',
      description: 'API version. Currently fixed to V2.',
      const: 'V2',
    },
    date: {
      title: 'Order Date',
      description: 'Order timestamp in the format of YYYYMMDDHHMMSS.',
      type: 'integer',
    },
    sign: {
      title: 'Order Signature',
      description: 'MD5 of the order signature.',
      type: 'string',
      pattern: '^[a-f0-9]{32}$',
    },
    extra: {
      title: 'Additional Info',
      description: 'Any additional info. This could be the payment account, or the code of the payment store.',
      type: 'string',
    },
  },
  required: [
    'orderNo',
    'bizAmt',
    'status',
    'version',
    'date',
    'sign',
  ],
  additionalProperties: false,
});

export type ApiResponseSchema = FromSchema<typeof apiResponseSchema>;
