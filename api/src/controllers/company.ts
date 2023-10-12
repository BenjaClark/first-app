import createLogger from "../utils/logger";
import * as CompanyModel from "../models/company";

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
    fantasyname,
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
  const { rut, fantasyName, name, activity, address, district, email, phone } =
    req.body;

  const resultGetByRut = await CompanyModel.getByRut(rut);

  if (!resultGetByRut.success) {
    createLogger.error({
      model: "company/getByRut",
      error: resultGetByRut.error,
    });
    res
      .status(500)
      .json({ success: false, data: null, error: resultGetByRut.error });
    return;
  }

  if (!resultGetByRut.data) {
    const result = await CompanyModel.insert(
      rut,
      fantasyName,
      name,
      activity,
      address,
      district,
      email,
      phone
    );

    if (!result.success) {
      createLogger.error({
        model: "company/insert",
        error: result.error,
      });
      res.status(500).json({ success: false, data: null, error: result.error });
      return;
    }

    const data = {
      id: result.data.id,
      rut,
      fantasyName,
      name,
      activity,
      address,
      district,
      email,
      phone,
    };
    createLogger.info({
      controller: "company/upsert",
      message: "OK",
    });
    res.status(200).json({ success: true, data, error: null });
    return;
  }

  const result = await CompanyModel.updateById(
    resultGetByRut.data.id,
    rut,
    fantasyName,
    name,
    activity,
    address,
    district,
    email,
    phone
  );

  if (!result.success) {
    createLogger.error({
      model: "company/updateById",
      error: result.error,
    });
    res.status(500).json({ success: false, result, error: result.error });
    return;
  }

  const data = {
    id: resultGetByRut.data.id,
    rut,
    fantasyName,
    name,
    activity,
    address,
    district,
    email,
    phone,
  };
  createLogger.info({
    controller: "company/upsert",
    message: "OK",
  });
  res.status(200).json({ success: true, data, error: null });
  return;
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
  res
    .status(200)
    .json({
      success: true,
      data: result.data + " registro(s) eliminado(s)",
      error: null,
    });
  return;
};

export { getByRut, getById, getAll, deleteById, upsert };
