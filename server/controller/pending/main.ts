import {PoolConnection} from 'mariadb';

import {PendingOrder} from './type';
import {jsDateToSqlDate} from '../../utils/date';
import {fillPaymentTypeTable, paymentTypeMapping} from '../paymentType/main';
import {runQueryTxN} from '../utils';


export const createPendingTxNTable = async (conn: PoolConnection) => {
  await conn.query(`
    CREATE TABLE IF NOT EXISTS order_pending (
      order_no     VARCHAR(40)             NOT NULL COMMENT 'Order number'
        PRIMARY KEY,
      account_id   VARCHAR(23)             NOT NULL COMMENT 'Account ID',
      signature    CHAR(32)                NOT NULL COMMENT 'Order signature',
      ts_created   DATETIME                NOT NULL COMMENT 'Order creation timestamp',
      amount_order DECIMAL(11, 2)          NOT NULL COMMENT 'Amount on order',
      origin_ip    VARCHAR(45)             NOT NULL COMMENT 'Order origin IP',
      note         VARCHAR(250) DEFAULT '' NOT NULL COMMENT 'Order note',
      payment_type SMALLINT                NOT NULL COMMENT 'Order payment type',
      CONSTRAINT order_pending_lookup_index
        UNIQUE (order_no, signature),
      CONSTRAINT order_pending_order_payment_type_id_fk
        FOREIGN KEY (payment_type) REFERENCES order_payment_type (id)
    );
  `);
};

export const recordPendingTxN = async ({
  orderNo,
  accountId,
  signature,
  tsCreated,
  orderAmount,
  originIp,
  note,
  paymentType,
}: PendingOrder) => {
  await fillPaymentTypeTable();
  await runQueryTxN(async (conn) => {
    await createPendingTxNTable(conn);
    await conn.query(
      `
        INSERT INTO order_pending 
          (order_no, account_id, signature, ts_created, amount_order, origin_ip, note, payment_type)
        VALUES 
          (?, ?, ?, ?, ?, ?, ?, ?);
      `,
      [
        orderNo,
        accountId,
        signature,
        jsDateToSqlDate(tsCreated),
        orderAmount,
        originIp,
        note,
        paymentTypeMapping[paymentType],
      ],
    );
  });
};
