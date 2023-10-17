import pool from "../utils/database";
import { _getByInvoiceId, _insert, _updateById } from "../queries/invoiceTot";

const getByInvoiceId: any = async (id: string) => {
  try {
    const result = await pool.query(_getByInvoiceId, [id]);
    return {
      success: true,
      data: result.rows.length > 0 ? result.rows[0] : null,
      error: null,
    };
  } catch (e) {
    return { success: false, data: null, error: (e as Error).message };
  }
};

const insert: any = async (
  invoicecab_id: string,
  subTotal: number,
  tax: string,
  total: number
) => {
  try {
    const result = await pool.query(_insert, [
      invoicecab_id,
      subTotal,
      tax,
      total,
    ]);
    return { success: true, data: result.rows[0], error: null };
  } catch (e) {
    return { success: false, data: null, error: (e as Error).message };
  }
};

const updateById: any = async (
  id: string,
  invoicecab_id: string,
  subTotal: number,
  tax: number,
  total: number
) => {
  try {
    const result = await pool.query(_updateById, [
      id,
      invoicecab_id,
      subTotal,
      tax,
      total,
    ]);
    return { success: true, data: result.rows[0], error: null };
  } catch (e) {
    return { success: false, data: null, error: (e as Error).message };
  }
};

export { getByInvoiceId, insert, updateById };
