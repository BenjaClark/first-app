import * as CustomerModel from "../models/customer";
import * as CustomerService from "../services/customer";

import createLogger from "../utils/logger";

const getAll = async (req: any, res: any) => {
  const result = await CustomerModel.getAll();

  if (!result.success) {
    createLogger.error({
      model: "customer/getAll",
      error: result.error,
    });
    res.status(500).json({ success: false, data: null, error: result.error });
    return;
  }

  const data = result.data.map((customer: any) => {
    return {
      id: customer.id,
      type: customer.type,
      rut: customer.rut,
      name: customer.name,
      address: customer.address,
      district: customer.district,
      email: customer.email,
      phone: customer.phone,
    };
  });
  createLogger.info({
    controller: "customer/getAll",
    message: "OK",
  });
  res.status(200).json({ success: true, data, error: null });
  return;
};

const getByRut = async (req: any, res: any) => {
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
    controller: "customer/getByRut",
    message: "OK",
  });
  res.status(200).json({ success: true, data, error: null });
  return;
};

const getById = async (req: any, res: any) => {
  const { id } = req.params;
  const result = await CustomerModel.getById(id);

  if (!result.success) {
    createLogger.error({
      model: "customer/getById",
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

  const { type, rut, fantasyname, name, address, district, email, phone } =
    result.data;

  const data = {
    id,
    type,
    rut,
    fantasyname,
    name,
    address,
    district,
    email,
    phone,
  };
  createLogger.info({
    controller: "customer/getById",
    message: "OK",
  });
  res.status(200).json({ success: true, data, error: null });
  return;
};

const deleteById = async (req: any, res: any) => {
  const { id } = req.params;
  const result = await CustomerModel.deleteById(id);

  if (!result.success) {
    createLogger.error({
      model: "customer/deleteById",
      error: result.error,
    });
    res.status(500).json({ success: false, data: null, error: result.error });
    return;
  }
  createLogger.info({
    controller: "customer/deteleById",
    message: "OK",
  });
  res.status(200).json({
    success: true,
    data: result.data + " registro(s) eliminado(s)",
    error: null,
  });
  return;
};

const upsert = async (req: any, res: any) => {
  const customerResult = await CustomerService.upsert(req.body);

  if (!customerResult.success) {
    createLogger.error({
      controller: "person/upsert",
      error: customerResult.error,
    });

    return res
      .status(500)
      .json({ success: false, data: null, error: customerResult.error });
  }
  return res
    .status(200)
    .json({ success: true, data: customerResult.data, error: null });
};

export { getAll, getByRut, deleteById, upsert, getById };
