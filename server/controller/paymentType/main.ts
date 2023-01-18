import {PoolConnection} from 'mariadb';

import {PaymentType} from '../../types';
import {runQueryTxN} from '../utils';


export const paymentTypeMapping: {[type in PaymentType]: number} = {
  CVS: 1,
};

const createPaymentTypeTable = async (conn: PoolConnection) => {
  await conn.query(`
    CREATE TABLE IF NOT EXISTS order_payment_type (
      id   SMALLINT AUTO_INCREMENT
        PRIMARY KEY,
      name VARCHAR(40) NOT NULL,
      CONSTRAINT order_payment_type_id_name_uindex
          UNIQUE (id, name)
    );
  `);
};

export const fillPaymentTypeTable = async () => {
  await runQueryTxN(async (conn) => {
    await createPaymentTypeTable(conn);

    const values: (number | string)[] = Object
      .entries(paymentTypeMapping)
      .flatMap(([name, id]) => [id, name]);
    const queryTemplate: string = Object
      .entries(paymentTypeMapping)
      .map(() => `(?, ?)`)
      .join(', ');

    await conn.query(
      `
      INSERT IGNORE INTO order_payment_type (id, name)
      VALUES ${queryTemplate};
    `,
      values,
    );
  });
};
