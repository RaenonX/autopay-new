import {asConst, FromSchema} from 'json-schema-to-ts';


export const apiRequestSchema = asConst({
  type: 'object',
  properties: {
    version: {
      title: 'API Version',
      description: 'API version. Strictly set to V3 for now.',
      const: 'V3',
    },
    signType: {
      title: 'Signature Message Type',
      description: 'Order signature hashing algorithm. Strictly set to MD5 for now.',
      const: 'MD5',
    },
    merchantNo: {
      title: 'Merchant No.',
      description: 'Obtained from the API backend.',
      type: 'string',
    },
    orderNo: {
      title: 'Order No.',
      description: 'Order number. Can be customized to any string.',
      type: 'string',
    },
    bizAmt: {
      title: 'Amount',
      description: 'Amount SCHEDULED to pay. Actual amount paid to be returned in the callback.',
      type: 'number',
    },
    date: {
      title: 'Order Date',
      description: 'Order timestamp in the format of YYYYMMDDHHMMSS.',
      type: 'integer',
    },
    payType: {
      title: 'Payment Type',
      description: 'Enum of the payment type. Currently only 2 (Convenience Store / CVS) is allowed.',
      enum: [
        2, // Convenience Store
      ],
    },
    noticeUrl: {
      title: 'Callback URL',
      description: 'URL for receiving the order completion callback.',
      type: 'string',
      format: 'uri',
    },
    returnUrl: {
      title: 'Redirect URL',
      description: 'URL for redirecting the user on order completed.',
      type: 'string',
      format: 'uri',
    },
    sign: {
      title: 'Order Signature',
      description: 'Order signature generated using MD5. Should be hashed from the URLSearchParams ' +
        'of the payload with the specific secret attached to the end.',
      type: 'string',
      pattern: '^[a-f0-9]{32}$',
    },
    customName: {
      title: 'Name',
      description: 'Name of the order creator.',
      type: 'string',
    },
    customNo: {
      title: 'Custom Order No.',
      description: 'Custom order number.',
      type: 'string',
    },
    mobile: {
      title: 'Mobile',
      description: 'Mobile phone number of the order creator.',
      type: 'string',
      pattern: '^[0-9]{10}$',
    },
    notes: {
      title: 'Note',
      description: 'Note on the order.',
      type: 'string',
    },
  },
  required: [
    'version',
    'signType',
    'merchantNo',
    'orderNo',
    'bizAmt',
    'date',
    'payType',
    'noticeUrl',
    'returnUrl',
    'sign',
  ],
  additionalProperties: false,
});

export type ApiRequestSchema = FromSchema<typeof apiRequestSchema>;

export type ApiRequestSchemaToSign = Omit<ApiRequestSchema, 'sign'>;
