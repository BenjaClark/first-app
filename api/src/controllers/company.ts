import * as CompanyModel from "../models/company";
import * as CompanyService from "../services/company";

import createLogger from "../utils/logger";

const getByRut = async (req: any, res: any) => {
  const { rut } = req.params;
  const result = await CompanyModel.getByRut(rut);

  if (!result.success) {
    createLogger.error({
      model: "company/getByRut",
      error: result.error,
    });
    res.status(500).json({ success: false, data: null, error: result.error });
    return;
  }

  if (!result.data) {
    res.status(200).json({ success: true, data: result.data, error: null });
    return;
  }

  const { id, fantasyname, name, activity, address, district, email, phone } =
    result.data;

  const data = {
    id,
    rut,
    fantasyName: fantasyname,
    name,
    activity,
    address,
    district,
    email,
    phone,
  };

  createLogger.info({
    controller: "company/getByRut",
    message: "OK",
  });
  res.status(200).json({ success: true, data, error: null });
  return;
};

const getById = async (req: any, res: any) => {
  const { id } = req.params;
  const result = await CompanyModel.getById(id);

  if (!result.success) {
    createLogger.error({
      model: "company/getById",
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

  const { rut, fantasyname, name, activity, address, district, email, phone } =
    result.data;

  const data = {
    id,
    rut,
    fantasyName: fantasyname,
    name,
    activity,
    address,
    district,
    email,
    phone,
  };
  createLogger.info({
    controller: "company/getById",
    message: "OK",
  });
  res.status(200).json({ success: true, data, error: null });
  return;
};

const getAll = async (req: any, res: any) => {
  const result = await CompanyModel.getAll();

  if (!result.success) {
    createLogger.error({
      model: "company/getAll",
      error: result.error,
    });
    res.status(500).json({ success: false, data: null, error: result.error });
    return;
  }

  const data = result.data.map((company: any) => {
    return {
      id: company.id,
      rut: company.rut,
      fantasyName: company.fantasyname,
      name: company.name,
      activity: company.activity,
      address: company.address,
      district: company.district,
      email: company.email,
      phone: company.phone,
    };
  });
  createLogger.info({
    controller: "company/getAll",
    message: "OK",
  });
  res.status(200).json({ success: true, data, error: null });
  return;
};

const upsert = async (req: any, res: any) => {
  const companyResult = await CompanyService.upsert(req.body);

  if (!companyResult.success) {
    createLogger.error({
      controller: "company/upsert",
      error: companyResult.error,
    });

    return res
      .status(500)
      .json({ success: false, data: null, error: companyResult.error });
  }
  return res
    .status(200)
    .json({ success: true, data: companyResult.data, error: null });
};

const deleteById = async (req: any, res: any) => {
  const { id } = req.params;
  const result = await CompanyModel.deleteById(id);

  if (!result.success) {
    createLogger.error({
      model: "company/deleteById",
      error: result.error,
    });
    res.status(500).json({ success: false, data: null, error: result.error });
    return;
  }
  createLogger.info({
    controller: "company/deteleById",
    message: "OK",
  });
  res.status(200).json({
    success: true,
    data: result.data + " registro(s) eliminado(s)",
    error: null,
  });
  return;
};

export { getByRut, getById, getAll, deleteById, upsert };
