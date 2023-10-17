import pool from "../utils/database";
import {
  _getAll,
  _getById,
  _insert,
  _updateById,
  _deleteById,
} from "../queries/invoiceCab";

const getAll: any = async () => {
  try {
    const result = await pool.query(_getAll);
    return { success: true, data: result.rows, error: null };
  } catch (e) {
    return { success: false, data: null, error: (e as Error).message };
  }
};

const getById: any = async (id: string) => {
  try {
    const result = await pool.query(_getById, [id]);
    return {
      success: true,
      data: result.rows.length > 0 ? result.rows[0] : null,
      error: null,
    };
  } catch (e) {
    return { success: false, data: null, error: (e as Error).message };
  }
};

const insert: any = async (number: number, customer_id: string, date: Date) => {
  try {
    const result = await pool.query(_insert, [number, customer_id, date]);
    return { success: true, data: result.rows[0], error: null };
  } catch (e) {
    return { success: false, data: null, error: (e as Error).message };
  }
};

const updateById: any = async (
  id: number,
  number: number,
  customer_id: string,
  date: Date
) => {
  try {
    const result = await pool.query(_updateById, [
      id,
      number,
      customer_id,
      date,
    ]);
    return { success: true, data: result.rows[0], error: null };
  } catch (e) {
    return { success: false, data: null, error: (e as Error).message };
  }
};

const deleteById: any = async (id: number) => {
  try {
    const result = await pool.query(_deleteById, [id]);
    return { success: true, data: result.rowCount, error: null };
  } catch (e) {
    return { success: false, data: null, error: (e as Error).message };
  }
};

export { getById, getAll, insert, updateById, deleteById };
