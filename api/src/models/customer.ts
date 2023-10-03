import pool from "../utils/database";

import {
  _getByRut,
  _getAll,
  _getById,
  _getCustomerById,
  _insertCustomer,
  _insertCompany,
  _insertPerson,
  _updateById,
  _updatePersonById,
  _updateCompanyById,
  _deleteById,
} from "../queries/customer";

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

const getById: any = async (id: string) => {
  try {
    const result = await pool.query(_getById, [id]);
    return { success: true, data: result.rows[0], error: null };
  } catch (e) {
    return { success: false, data: null, error: (e as Error).message };
  }
};

const getCustomerById: any = async (id: string) => {
  try {
    const result = await pool.query(_getCustomerById, [id]);
    return { success: true, data: result.rows[0], error: null };
  } catch (e) {
    return { success: false, data: null, error: (e as Error).message };
  }
};

const insertCustomer: any = async (person_id: number, login: string) => {
  try {
    const result = await pool.query(_insertCustomer, [person_id, login]);
    return { success: true, data: result.rows[0], error: null };
  } catch (e) {
    return { success: false, data: null, error: (e as Error).message };
  }
};

const insertCompany: any = async (
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
    const result = await pool.query(_insertCompany, [
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
  type: string,
  person_id: string,
  company_id: string
) => {
  try {
    const result = await pool.query(_updateById, [
      id,
      type,
      person_id,
      company_id,
    ]);
    return { success: true, data: result.rows[0], error: null };
  } catch (e) {
    return { success: false, data: null, error: (e as Error).message };
  }
};

const updatePersonById: any = async (
  id: number,
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
    const result = await pool.query(_updatePersonById, [
      id,
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

const updateCompanyById: any = async (
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
      const result = await pool.query(_updateCompanyById, [
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

export {
  getByRut,
  getAll,
  getById,
  getCustomerById,
  insertCustomer,
  insertCompany,
  insertPerson,
  updateById,
  updatePersonById,
  updateCompanyById,
  deleteById,
};
