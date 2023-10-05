import pool from "../utils/database";

import { _getAll, _getByRut, _deleteById, _insert, _updateById } from "../queries/customer";

const getAll: any = async () => {
  try {
    const result = await pool.query(_getAll);
    return { success: true, data: result.rows, error: null };
  } catch (e) {
    return { success: false, data: null, error: (e as Error).message };
  }
};

const getByRut: any = async (rut: string) => {
  try {
    const result = await pool.query(_getByRut, [rut]);
    return {
      success: true,
      data: result.rows.length > 0 ? result.rows[0] : null,
      error: null,
    };
  } catch (e) {
    return { success: false, data: null, error: (e as Error).message };
  }
};

const insert: any = async (type: string, person_id: number, company_id: number) => {
  try {
    const result = await pool.query(_insert, [type, person_id, company_id]);
    return { success: true, data: result.rows[0], error: null };
  } catch (e) {
    return { success: false, data: null, error: (e as Error).message };
  }
};

const updateById: any = async (id: number, person_id: number, company_id: number) => {
  try {
    const result = await pool.query(_updateById, [id, person_id, company_id]);
    return { success: true, data: result.rows[0], error: null };
  } catch (e) {
    return { success: false, data: null, error: (e as Error).message };
  }
};

const deleteById: any = async (id: number) => {
  try {
    const result = await pool.query(_deleteById, [id]);
    return { success: true, data: null, error: null };
  } catch (e) {
    return { success: false, data: null, error: (e as Error).message };
  }
};

export { getAll, getByRut, deleteById, insert, updateById}
