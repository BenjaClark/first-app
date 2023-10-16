import pool from "../utils/database";
import {
  _getAll,
  _getById,
  _getByCode,
  _insert,
  _updateById,
  _deleteById,
} from "../queries/product";

const getByCode: any = async (code: string) => {
  try {
    const result = await pool.query(_getByCode, [code]);
    return { success: true, data: result.rows.length > 0 ? result.rows[0]:null, error: null };
  } catch (e) {
    return { success: false, data: null, error: (e as Error).message };
  }
};

const getById: any = async (id: string) => {
  try {
    const result = await pool.query(_getById, [id]);
    return { success: true, data: result.rows.length > 0 ? result.rows[0]:null, error: null };
  } catch (e) {
    return { success: false, data: null, error: (e as Error).message };
  }
};

const getAll: any = async () => {
  try {
    const result = await pool.query(_getAll);
    return { success: true, data: result.rows, error: null };
  } catch (e) {
    return { success: false, data: null, error: (e as Error).message };
  }
};

const insert: any = async (
  code: string,
  name: string,
  price: number
) => {
  try {
    const result = await pool.query(_insert, [
      code,
      name,
      price
    ]);
    return { success: true, data: result.rows[0], error: null };
  } catch (e) {
    return { success: false, data: null, error: (e as Error).message };
  }
};

const updateById: any = async (
  id: number,
  code: string,
  name: string,
  price: number
) => {
  try {
    const result = await pool.query(_updateById, [
      id,
      code,
      name,
      price,
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

export { getByCode, getById, getAll, insert, updateById, deleteById};