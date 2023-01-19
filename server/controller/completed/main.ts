import {PoolConnection} from 'mariadb';

import {CompletedOrder} from './type';
import {jsDateToSqlDate} from '../../utils/date';
import {runQueryTxN} from '../utils';


export const createCompletedTxNTable = async (conn: PoolConnection) => {
  await conn.query(`
    CREATE TABLE IF NOT EXISTS order_completed (
      order_no     VARCHAR(40)             NOT NULL COMMENT 'Order number'
        PRIMARY KEY,
      account_id   VARCHAR(23)             NOT NULL COMMENT 'Account ID',
      signature    CHAR(32)                NOT NULL COMMENT 'Order signature',
      ts_created   DATETIME                NOT NULL COMMENT 'Order creation timestamp',
      ts_completed DATETIME                NOT NULL COMMENT 'Order completion timestamp',
      amount_order DECIMAL(11, 2)          NOT NULL COMMENT 'Amount on order',
      amount_paid  DECIMAL(11, 2)          NOT NULL COMMENT 'Amount paid',
      origin_ip    VARCHAR(45)             NOT NULL COMMENT 'Order origin IP',
      mobile       VARCHAR(15)             NOT NULL COMMENT 'Order creator mobile number',
      message      VARCHAR(200) DEFAULT ''     NULL COMMENT 'Order completion message',
      note         VARCHAR(250) DEFAULT '' NOT NULL COMMENT 'Order note',
      payment_type SMALLINT                NOT NULL COMMENT 'Order payment type',
      CONSTRAINT order_completed_lookup_index
        UNIQUE (order_no, signature),
      CONSTRAINT order_completed_order_payment_type_id_fk
        FOREIGN KEY (payment_type) REFERENCES order_payment_type (id)
    );
  `);
};

export const recordCompletedTxN = async ({
  orderNo,
  signature,
  tsCompleted,
  paidAmount,
  message,
}: CompletedOrder) => {
  await runQueryTxN(async (conn) => {
    await createCompletedTxNTable(conn);
    const [response] = await conn.query(
      `
        SELECT 
          *
        FROM
          order_pending
        WHERE
          order_no = ? AND signature = ?
      `,
      [orderNo, signature],
    );

    const keys = [...Object.keys(response), 'amount_paid', 'ts_completed', 'message'];
    const values = Object.values(response);

    await conn.query(
      `
        INSERT INTO order_completed
          (${keys.join(', ')})
        VALUES
          (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);
      `,
      [
        ...values,
        paidAmount,
        jsDateToSqlDate(tsCompleted),
        message,
      ],
    );

    await conn.query(
      `
        DELETE FROM
          order_pending
        WHERE
          order_no = ? AND signature = ?
      `,
      [orderNo, signature],
    );
  });
};
