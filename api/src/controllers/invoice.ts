import * as InvoiceCabModel from "../models/invoiceCab";
import * as InvoiceDetModel from "../models/invoiceDet";
import * as InvoiceTotModel from "../models/invoiceTot";
import * as CustomerModel from "../models/customer";
import * as UtilsLogger from "../utils/logger";
import createLogger from "../utils/logger";

const getAll = async (req: any, res: any) => {
  const result = await InvoiceCabModel.getAll();

  if (!result.success) {
    createLogger.error({
      model: "invoiceCab/getAll",
      error: result.error,
    });
    res.status(500).json({ success: false, data: null, error: result.error });
    return;
  }

  const data = result.data.map((invoice: any) => {
    return {
      id: invoice.id,
      number: invoice.number,
      customer_id: invoice.customer_id,
      date: invoice.date,
      quantity: invoice.quantity,
      product_id: invoice.product_id,
      price: invoice.price,
      subtotal: invoice.subtotal,
      tax: invoice.tax,
      total: invoice.total,
    };
  });
  createLogger.info({
    controller: "user/getAll",
    message: "OK",
  });
  res.status(200).json({ success: true, data, error: null });
  return;
};

const getById = async (req: any, res: any) => {
  const { id } = req.params;
  const result = await InvoiceCabModel.getById(id);

  if (!result.success) {
    createLogger.error({
      model: "invoiceCab/getById",
      error: result.error,
    });
    res.status(500).json({ success: false, data: null, error: result.error });
    return;
  }

  if (!result.data) {
    res
      .status(200)
      .json({ success: true, data: result.data, error: result.error });
    return;
  }

  const {
    number,
    customer_id,
    date,
    quantity,
    product_id,
    price,
    subtotal,
    tax,
    total,
  } = result.data;

  const data = {
    id,
    number,
    customer_id,
    date,
    quantity,
    product_id,
    price,
    subtotal,
    tax,
    total,
  };

  createLogger.info({
    controller: "invoideCab/getById",
    message: "OK",
  });
  res.status(200).json({ success: true, data, error: null });
  return;
};

const getByCustomerRut = async (req: any, res: any) => {
  const { rut } = req.params;
  const result = await CustomerModel.getByRut(rut);

  if (!result.success) {
    createLogger.error({
      model: "customer/getByRut",
      error: result.error,
    });
    res.status(500).json({ success: false, data: null, error: result.error });
    return;
  }
  if (!result.data) {
    res
      .status(200)
      .json({ success: true, data: result.data, error: result.error });
    return;
  }

  const { id, type, name, address, district, email, phone } = result.data;

  const data = {
    id,
    type,
    rut,
    name,
    address,
    district,
    email,
    phone,
  };
  createLogger.info({
    controller: "invoice/getByCustomerRut",
    message: "OK",
  });
  res.status(200).json({ success: true, data, error: null });
  return;
};

const upsert = async (req: any, res: any) => {
  const {
    number,
    customer: {
      type,
      rut,
      fantasyName,
      name,
      activity,
      paternalLastName,
      maternalLastName,
      address,
      district,
      email,
      phone,
    },
    date,

    detail: [
      {
        product: {code, product_name, price},
        quantity,
      },
    ],

    total: {},
  } = req.body;
};

const deleteById = async (req: any, res: any) => {
  const { id } = req.params;
  const result = await InvoiceCabModel.deleteById(id);

  if (!result.success) {
    createLogger.error({
      model: "user/deleteById",
      error: result.error,
    });
    res.status(500).json({ success: false, data: null, error: result.error });
    return;
  }
  createLogger.info({
    controller: "user/deleteById",
    message: "OK",
  });
  res.status(200).json({
    success: true,
    data: result.data + " registro(s) eliminado(s)",
    error: null,
  });
  return;
};

export { upsert, getByCustomerRut, getAll, deleteById, getById };
