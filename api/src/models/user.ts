import pool from "../utils/database";
import bcrypt from "bcrypt";
import {
  _getByLogin,
  _getByRut,
  _insert,
  _getAll,
  _deleteById,
  _updateById,
  _getById,
} from "../queries/user";

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

const insert: any = async (person_id: number, login: string) => {
  try {
    const result = await pool.query(_insert, [person_id, login]);
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

const updateById: any = async (person_id: number, login: string) => {
  try {
    const result = await pool.query(_updateById, [person_id, login]);
    return { success: true, data: result.rows[0], error: null };
  } catch (e) {
    return { success: false, data: null, error: (e as Error).message };
  }
};

const assignPassword: any = async (id: string, password: string) => {
  try {
    const saltRounds = 10;
    const hash = await bcrypt.hash(password, saltRounds);

    await pool.query("UPDATE app.user SET hash = $2 WHERE id = $1", [id, hash]);

    return { success: true, data: "Password modificada", error: null };
  } catch (e) {
    return { success: false, data: null, error: (e as Error).message };
  }
};

export {
  getByRut,
  insert,
  getByLogin,
  getAll,
  deleteById,
  updateById,
  getById,
  assignPassword,
};
