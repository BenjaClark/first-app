import pool from "../utils/database";

import {
  _getByLogin,
  _getByRut,
  _insertPerson,
  _insertUser,
  _getAll,
  _deleteById,
  _updateById,
} from "../queries/user";

const getByRut: any = async (rut: string) => {
  try {
    const result = await pool.query(_getByRut, [rut]);
    return { success: true, data: result.rows[0], error: null };
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

const getByLogin: any = async (login: string) => {
  try {
    const result = await pool.query(_getByLogin, [login]);
    return { success: true, data: result.rows[0], error: null };
  } catch (e) {
    return { success: false, data: null, error: (e as Error).message };
  }
};

const insertPerson: any = async (
  rut: string,
  name: string,
  paternalLastName: string,
  maternalLastName: string,
  address: string,
  district: string,
  email: string,
  phone: string
) => {
  try {
    const result = await pool.query(_insertPerson, [
      rut,
      name,
      paternalLastName,
      maternalLastName,
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

const insertUser: any = async (person_id: number, login: string) => {
  try {
    const result = await pool.query(_insertUser, [person_id, login]);
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

const updateById: any = async (
  id: number,
  person_id: string,
  hash: string
) => {
  try {
    const result = await pool.query(_updateById, [id, person_id, hash]);
    return { success: true, data: result.rows[0], error: null };
  } catch (e) {
    return { success: false, data: null, error: (e as Error).message };
  }
};

export {
  getByRut,
  insertPerson,
  insertUser,
  getByLogin,
  getAll,
  deleteById,
  updateById,
};
