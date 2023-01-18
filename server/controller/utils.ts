import {PoolConnection} from 'mariadb';

import {dbPool} from './const';


type RunQueryCallback = (conn: PoolConnection) => Promise<void>;

export const runQueryTxN = async (callback: RunQueryCallback) => {
  let conn;

  try {
    conn = await dbPool.getConnection();

    await conn.beginTransaction();

    await callback(conn);

    await conn.commit();
  } catch (err) {
    throw err;
  } finally {
    await conn?.rollback();
    await conn?.end();
  }
};
