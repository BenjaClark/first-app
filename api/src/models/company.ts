import pool from "../utils/database";
import {
  _getAll,
  _getById,
  _getByRut,
  _insert,
  _updateById,
  _deleteById,
} from "../queries/company";

const getByRut: any = async (rut: string) => {
  try {
    const result = await pool.query(_getByRut, [rut]);
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
  rut: string,
  fantasyName: string,
  name: string,
  activity: string,
  address: string,
  district: string,
  email: string,
  phone: string
) => {
  try {
    const result = await pool.query(_insert, [
      rut,
      fantasyName,
      name,
      activity,
      address,
      district,
      email,
      phone,
    ]);
    return { success: true, data: result.rows[0], error: null };
  } catch (e) {
    return { success: false, data: null, error: (e as Error).message };
  }
};

const updateById: any = async (
  id: number,
  rut: string,
  fantasyName: string,
  name: string,
  activity: string,
  address: string,
  district: string,
  email: string,
  phone: string
) => {
  try {
    const result = await pool.query(_updateById, [
      id,
      rut,
      fantasyName,
      name,
      activity,
      address,
      district,
      email,
      phone,
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

export { getByRut, getById, getAll, insert, updateById, deleteById};