import {asConst, FromSchema} from 'json-schema-to-ts';


export const responseSchema = asConst({
  oneOf: [
    {
      type: 'object',
      properties: {
        success: {
          title: 'Success Flag (Success)',
          description: 'Order successfully created.',
          const: true,
        },
        url: {
          title: 'Payment Redirection URL',
          description: 'Order payment redirection URL.',
          type: 'string',
        },
      },
      required: [
        'success',
        'url',
      ],
      additionalProperties: false,
    },
    {
      type: 'object',
      properties: {
        success: {
          title: 'Success Flag (Failed)',
          description: 'Order failed to create.',
          const: false,
        },
        message: {
          title: 'Message',
          description: 'Additional message. Likely to be empty on successful order creation ' +
            'and contain error messages on failed one.',
          type: 'string',
        },
      },
      required: [
        'success',
        'message',
      ],
      additionalProperties: false,
    },
  ],
});

export type ResponseSchema = FromSchema<typeof responseSchema>;
