import {asConst, FromSchema} from 'json-schema-to-ts';


export const requestSchema = asConst({
  type: 'object',
  properties: {
    amount: {
      title: 'Amount',
      description: 'Amount SCHEDULED to pay. Actual amount paid to be returned in the callback.',
      type: 'number',
    },
    accountId: {
      title: 'Account ID',
      description: 'Account ID of the order creator.',
      type: 'string',
    },
    mobile: {
      title: 'Mobile',
      description: 'Mobile phone number of the order creator.',
      type: 'string',
      pattern: '^[0-9]{10}$',
    },
  },
  required: [
    'amount',
    'accountId',
    'mobile',
  ],
  additionalProperties: false,
});

export type RequestSchema = FromSchema<typeof requestSchema>;
