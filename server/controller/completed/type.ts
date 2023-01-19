import {PendingOrder} from '../pending/type';


export type CompletedOrder = Pick<PendingOrder, 'orderNo' | 'signature'> & {
  tsCompleted: Date,
  paidAmount: number,
  message: string,
};
