import {PaymentType} from '../../types';


export type PendingOrder = {
  orderNo: string,
  accountId: string,
  signature: string,
  tsCreated: Date,
  orderAmount: number,
  originIp: string,
  note: string,
  paymentType: PaymentType,
};
