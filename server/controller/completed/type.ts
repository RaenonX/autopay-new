import {PendingOrder} from '../pending/type';


export type CompletedOrder = PendingOrder & {
  tsCompleted: Date,
  paidAmount: number,
  mobile: string,
  message: string,
};
